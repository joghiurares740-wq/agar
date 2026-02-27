'use client';

import { useState } from 'react';
import Background from "../components/Background";

export default function Home() {
  const [selectedBet, setSelectedBet] = useState<string>('$5');

  return (
    <main className="min-h-screen relative text-white font-sans selection:bg-blue-500 selection:text-white p-4 md:p-6 overflow-x-hidden pb-24">
      
      {/* --- FUNDAL + VIGNETTE --- */}
      <Background />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#000220_100%)] opacity-70 z-0"></div>
      
      {/* --- MENIU STÂNGA SUS --- */}
      <div className="fixed top-8 left-8 z-20 flex flex-col gap-8">
        <button className="group text-neutral-500 hover:text-white transition-all duration-300"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg></button>
        <button className="group text-neutral-500 hover:text-white transition-all duration-300"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></button>
        <button className="group text-neutral-500 hover:text-white transition-all duration-300"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition duration-500"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg></button>
      </div>

      {/* --- LOGO CENTRAL --- */}
      <div className="relative z-10 flex justify-center mb-10 mt-8">
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-slate-200 via-white to-slate-400 drop-shadow-[0_0_35px_rgba(100,200,255,0.6)]">
            SOLANA GAME
        </h1>
      </div>

      {/* --- GRID PRINCIPAL --- */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        
        {/* === STÂNGA: Leaderboard & Stats === */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-black/60 border-t-white/20 border-b-black/50 border-x-white/10 border rounded-xl p-4 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">🏆 Leaderboard</h3>
              <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">● Live</span>
            </div>
            <div className="space-y-2 mb-4 text-sm">
              {[{ name: "7777777", win: "$20,340", rank: 1, trend: 'hot' }, { name: "glx_duo", win: "$20,096", rank: 2, trend: 'up' }, { name: "Pow34r", win: "$18,427", rank: 3, trend: 'stable' }].map((player) => (
                <div key={player.rank} className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition cursor-pointer group">
                  <div className="flex items-center gap-2">
                      <span className="text-neutral-500 w-4 font-mono">{player.rank}.</span>
                      {player.trend === 'hot' && <span className="text-xs animate-pulse" title="High Win Streak">🔥</span>}
                      {player.trend === 'up' && <span className="text-xs text-green-400" title="Climbing">↑</span>}
                      <span className="text-neutral-300 group-hover:text-white transition">{player.name}</span>
                  </div>
                  <span className="text-amber-400 font-mono font-bold">{player.win}</span>
                </div>
              ))}
            </div>
            <button className="w-full py-2 bg-black/50 border border-neutral-700 text-neutral-300 text-xs font-bold rounded-lg hover:bg-white hover:text-black hover:border-white transition uppercase tracking-wide">View Full Leaderboard</button>
          </div>
          <div className="bg-black/60 border-t-white/20 border-b-black/50 border-x-white/10 border rounded-xl p-4 flex-1 backdrop-blur-md shadow-lg flex flex-col">
            <h3 className="font-bold text-purple-400 mb-6 flex items-center gap-2">📊 Player Stats</h3>
            <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/10"><span className="text-neutral-400 text-xs font-bold uppercase">Games</span><span className="text-white font-mono font-bold">142</span></div>
                <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/10"><span className="text-neutral-400 text-xs font-bold uppercase">Earnings</span><span className="text-green-400 font-mono font-bold">+$240.50</span></div>
                <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/10"><span className="text-neutral-400 text-xs font-bold uppercase">Win Rate</span><span className="text-amber-400 font-mono font-bold">48%</span></div>
            </div>
          </div>
        </div>

        {/* === CENTRU: Game Area === */}
        <div className="lg:col-span-6 flex flex-col gap-6 relative">
          
          {/* ENERGY GLOW (Lumină în spate) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-blue-500/20 blur-[80px] rounded-full -z-10 animate-pulse-slow"></div>

          <div className="bg-black/60 border-t-white/20 border-b-black/50 border-x-white/10 border rounded-xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            <div className="relative mb-6">
                <input type="text" defaultValue="ciopax2" className="w-full h-12 bg-black/50 border border-white/10 rounded-lg px-4 text-white font-bold focus:outline-none focus:border-slate-400 focus:bg-black/80 transition"/>
                <button className="absolute right-3 top-3 text-neutral-400 hover:text-white">✎</button>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-6">
              {['$1', '$5', '$10', '$20'].map((amt) => (
                <button key={amt} onClick={() => setSelectedBet(amt)} className={`border-2 font-black py-3 rounded-lg transition duration-300 uppercase text-lg ${selectedBet === amt ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105" : "bg-transparent border-slate-600 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white"}`}>{amt}</button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="py-2 border border-white/10 bg-black/40 rounded-lg text-xs font-bold text-neutral-400 hover:border-white hover:text-white transition uppercase flex justify-center items-center gap-2">🇺🇸 US Server</button>
              <button className="py-2 border border-white/10 bg-black/40 rounded-lg text-xs font-bold text-neutral-400 hover:border-white hover:text-white transition uppercase flex justify-center items-center gap-2">📜 Browse Lobbies</button>
            </div>

            <button className="w-full bg-gradient-to-b from-white via-slate-200 to-slate-400 text-black font-black text-2xl py-6 rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-wider flex items-center justify-center gap-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/40 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span className="text-3xl relative z-10">⚔️</span> <span className="relative z-10">ENTER BATTLE</span>
            </button>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                    <h4 className="text-3xl font-black text-slate-300">70</h4>
                    <p className="text-[10px] text-neutral-500 uppercase font-bold">Players In Game</p>
                </div>
                <div className="text-center">
                    <h4 className="text-3xl font-black text-slate-300">$1,214,902</h4>
                    <p className="text-[10px] text-neutral-500 uppercase font-bold">Global Player Winnings</p>
                </div>
            </div>

            {/* --- WIDGET: LIVE LOBBY SPECTATE (Corectat pentru 30 playeri) --- */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-3">
                
                {/* Header */}
                <div className="flex justify-between items-center">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Active Lobbies
                    </span>
                    <button className="text-[10px] text-blue-400 hover:text-white transition flex items-center gap-1">
                        Server List →
                    </button>
                </div>

                {/* Card Lobby Activ */}
                <div className="bg-black/40 border border-white/5 rounded-lg p-2 flex items-center justify-between group hover:border-white/20 transition">
                    
                    {/* Info Lobby */}
                    <div className="flex items-center gap-4">
                        {/* Status Icon */}
                        <div className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex flex-col items-center justify-center">
                            <span className="text-[8px] text-neutral-500 uppercase">Map</span>
                            <span className="text-[10px] font-bold text-white">EU1</span>
                        </div>
                        
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
                                High Stakes Arena
                                <span className="text-[8px] bg-green-900 text-green-400 px-1 rounded">FFA</span>
                            </span>
                            <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                                <span className="flex items-center gap-1 text-slate-300">
                                    👤 24/30 Players
                                </span>
                                <span className="text-amber-500">👑 Top: Slayer_99</span>
                            </div>
                        </div>
                    </div>

                    {/* BUTONUL DE SPECTATE */}
                    <button className="bg-white/10 hover:bg-white text-white hover:text-black px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wide transition flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        Spectate
                    </button>
                </div>
            </div>

          </div>
        </div>

        {/* === DREAPTA: Wallet & Friends === */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-black/60 border-t-white/20 border-b-black/50 border-x-white/10 border rounded-xl p-4 backdrop-blur-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-white flex items-center gap-2"><span className="text-green-400">💳</span> Wallet</h3>
              
              {/* DAILY BONUS BUTTON */}
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-bounce shadow-lg hover:shadow-pink-500/50 transition">
                  🎁 Bonus
              </button>
            </div>
            
            <div className="text-center mb-8"><h2 className="text-4xl font-bold text-slate-200">$0.98</h2><p className="text-xs text-neutral-500 mt-1 font-mono">0.0067 SOL</p></div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 bg-transparent border border-green-500 text-green-500 rounded-lg text-xs font-bold hover:bg-green-500 hover:text-black transition uppercase shadow-[0_0_10px_rgba(34,197,94,0.1)]">Add Funds</button>
              <button className="py-2 bg-transparent border border-blue-600 text-blue-500 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition uppercase shadow-[0_0_10px_rgba(37,99,235,0.1)]">Cash Out</button>
            </div>
            <div className="mt-4 flex justify-center"><button className="text-xs text-neutral-400 border border-neutral-700 px-4 py-2 rounded-lg hover:text-white hover:border-white transition">Connect Wallet (Demo)</button></div>
          </div>

          <div className="bg-black/60 border-t-white/20 border-b-black/50 border-x-white/10 border rounded-xl p-4 backdrop-blur-md shadow-lg flex flex-col min-h-[180px]">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-white flex gap-2">👥 Friends</h3><span className="text-[10px] bg-neutral-800 px-2 py-0.5 rounded text-neutral-400">0 playing</span></div>
            <div className="flex-1 flex flex-col items-center justify-center text-neutral-600 gap-2"><div className="text-4xl opacity-20">👤</div><p className="text-xs text-center text-neutral-500 font-semibold px-4">Don&apos;t win alone,<br/>add some friends</p></div>
            <button className="w-full mt-4 py-2 bg-black/50 border border-neutral-700 text-neutral-300 text-xs font-bold rounded-lg hover:bg-white hover:text-black hover:border-white transition uppercase tracking-wide">Add Friends</button>
          </div>
          <button className="w-full py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition uppercase tracking-wide hover:scale-105 hover:shadow-[#5865F2]/50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
            Join Discord
          </button>
        </div>
      </div>

      <div className="fixed bottom-12 left-0 w-full text-center z-30 pointer-events-none">
        <p className="text-[10px] text-neutral-500 uppercase tracking-widest pointer-events-auto hover:text-white transition cursor-pointer inline-block bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">Terms • Privacy Policy • Fair Play</p>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-black/80 border-t border-white/10 backdrop-blur-md h-10 flex items-center overflow-hidden z-40">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs font-bold font-mono text-neutral-400">
            <span className="flex items-center gap-2"><span className="text-green-400">WIN</span> 0x82...a42 just won 2.5 SOL</span>
            <span className="flex items-center gap-2"><span className="text-blue-400">JOIN</span> Phantom_Ghost joined the lobby</span>
            <span className="flex items-center gap-2"><span className="text-amber-400">JACKPOT</span> Global Pool reached 1,500 SOL!</span>
            <span className="flex items-center gap-2"><span className="text-green-400">WIN</span> titesa123 just won 0.5 SOL</span>
            <span className="flex items-center gap-2"><span className="text-purple-400">RANK</span> Pow34r reached Rank #2</span>
            <span className="flex items-center gap-2"><span className="text-green-400">WIN</span> 0x82...a42 just won 2.5 SOL</span>
            <span className="flex items-center gap-2"><span className="text-blue-400">JOIN</span> Phantom_Ghost joined the lobby</span>
        </div>
      </div>
    </main>
  );
}