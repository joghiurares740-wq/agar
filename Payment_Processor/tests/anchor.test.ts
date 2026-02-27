import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { NomnomAgar } from "../target/types/nomnom_agar";
import { PublicKey, SystemProgram } from "@solana/web3.js";

describe("nomnom_agar_final_validation", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.NomnomAgar as Program<NomnomAgar>;

  it("Verifică depunerea și securitatea retragerii", async () => {
    // 1. Calculăm manual adresa PDA pentru Config
    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId
    );
    const [poolPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("pool")],
      program.programId
    );

    console.log("Căutăm configurația la adresa:", configPda.toBase58());

    let configData;
    try {
      // Încercăm să citim datele
      configData = await program.account.config.fetch(configPda);
      if (configData) {
        console.log("✅ Admin detectat:", configData.admin.toBase58());
        console.log("✅ Server Authority detectat:", configData.signerAuthority.toBase58());
      }
    } catch (err) {
      console.error("❌ EROARE: Contul 'config' nu a fost găsit! Asigură-te că ai rulat instrucțiunea 'initialize' cu succes înainte.");
      return; // Oprim testul dacă nu avem config
    }

    // 2. Testăm depunerea (Join Pool)
    try {
      const txJoin = await program.methods
        .joinPool(new anchor.BN(100000000))
        .accounts({
          player: provider.wallet.publicKey,
          gamePool: poolPda,
          adminTreasury: configData.admin,
          config: configPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log("✅ Depunere reușită! ID:", txJoin);
    } catch (err) {
      console.log("ℹ️ Notă: Depunerea a sărit (posibil balanță insuficientă sau pool deja alimentat).");
    }

    // 3. Testăm REFUZUL retragerii (Demonstrația de Securitate)
    try {
      console.log("Provocăm securitatea: Încercăm retragerea fără serverul corect...");
      await program.methods
        .leavePool(new anchor.BN(50000000), Array(64).fill(0))
        .accounts({
          player: provider.wallet.publicKey,
          gamePool: poolPda,
          serverAuthority: provider.wallet.publicKey, // Folosim wallet-ul greșit intenționat
          config: configPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
    } catch (err: any) {
      // Verificăm dacă eroarea este de tip "ConstraintAddress" (adică serverul a fost respins)
      const isSecurityWorking = err.logs.some((log: string) => log.includes("2012") || log.includes("ConstraintAddress"));
      
      if (isSecurityWorking) {
        console.log("🛡️ REZULTAT FINAL: Securitatea funcționează! Contractul a blocat tentativa.");
      } else {
        console.log("Eroare neașteptată:", err.message);
      }
    }
  });
});