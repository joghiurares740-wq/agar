Checkpoint Architecture Doc — Systems Overview (Cashout = Exit)

This is a practical checkpoint doc: what each system is, what it must do, what it must not do, what data it owns, and what “done” looks like.

Core rules (locked for this architecture)
Players deposit funds into a program-controlled vault (PDA).

Players join an arena by locking a stake.

Players play on an authoritative server.

If a player exits, they cash out immediately and are removed from the arena.

If a player dies, their remaining locked value is transferred (claim) to the killer (minus fees).

The game never needs external money: all payouts come from what is locked in the arena.

You (operator) cannot withdraw user funds, ever.

System A — Solana Program (Escrow + Accounting) Purpose
Enforce non-custodial funds flow + solvency. This is the “bank + referee” for money rules.

Responsibilities

Hold all deposited wSOL in a PDA-owned vault token account

Track each player’s:

available_balance (withdrawable anytime when not locked)

locked_balance (currently in arena)

Track arena state and each participant’s entitlement:

locked_amount (their stake still “at risk”)

claimable_amount (what they can withdraw when exiting)

status (active / exited / dead)

Apply server-attested events:

“victim died to killer” → transfer victim locked value to killer claim

Execute exits:

Transfer claimable to player wallet and mark them exited

Enforce invariants (no printing / no double claim / no replay events)

Must NOT do

No admin withdrawal paths

No trust in client-supplied kill claims

No complex gameplay logic (movement/collisions) on-chain

On-chain Accounts (PDAs)

ConfigPDA

allowlisted attestor_pubkeys

fee settings (bps)

pause flags

optional: season length, min/max stake

VaultPDA

PDA authority + token account holding all escrowed wSOL

UserPDA (per wallet)

available_balance

locked_balance_total

stats counters (optional)

ArenaPDA / MatchPDA

identifies an arena “season” (e.g. day/hour)

total_locked

event_seq (replay protection)

active / ended

ParticipantPDA (arena + wallet)

locked_amount

claimable_amount

joined_at

status (ACTIVE/EXITED/DEAD)

Key Instructions (minimum viable)

deposit(amount)

withdraw(amount) (only from available_balance)

join_arena(arena_id, stake_amount)

apply_kill(arena_id, killer, victim, victim_locked, seq_no, sig)

exit_and_cashout(arena_id)

pays claimable_amount (minus fee if any)

Admin-only: set_attestor_keys, pause_joins, pause_kills

never “drain vault”

Invariants (must always hold)

A user cannot withdraw funds that are locked.

A participant can only exit once.

A kill event can only be applied once (seq/replay protection).

Total paid out + remaining entitlements ≤ total locked in vault (minus fees).

“Done” checkpoint for System A

On devnet, you can:

deposit → join arena → apply a kill → exit & cashout → withdraw to wallet

A malicious operator cannot move funds except through valid rules.

System B — Attestation Layer (Signed Events Contract Accepts) Purpose
Make the server’s decisions (kills) verifiable and replay-safe on-chain.

Responsibilities

Define the canonical event format the server signs

Ensure each event is:

uniquely identifiable

ordered or non-repeatable

bounded in impact (can’t overpay)

Event Types (v1)

KILL_EVENT

arena_id

seq_no (monotonic counter per arena)

killer_pubkey

victim_pubkey

victim_locked_amount (what is being transferred)

timestamp

optional log_hash (hash of server log segment)

Signature model

Server has an ed25519 keypair (attestor key).

Program checks signature against allowlisted key(s) in ConfigPDA.

Program enforces seq_no increases to prevent replays.

Must NOT do

No signing “arbitrary payouts”

No signing events that can exceed victim’s locked amount

“Done” checkpoint for System B

You can generate a signed KILL_EVENT off-chain and the program accepts it exactly once.

System C — Authoritative Game Server (Simulation + Event Producer) Purpose
Run the real-time Agar game and decide what happens (movement, collision, kills). It does not hold money.

Responsibilities

Manage WebSocket connections

Authenticate players (wallet signature login)

Verify eligibility:

player has joined arena on-chain (or via your API cache)

Run simulation loop:

apply player inputs

spawn pellets

resolve collisions

determine kills

On kill:

compute victim_locked_amount to transfer

sign KILL_EVENT

submit apply_kill tx (recommended v1)

On exit request:

stop sim for that player immediately

client calls exit_and_cashout (or server triggers it, but client-trigger is clearer)

Server modules

Auth service

“Sign-in with Solana” message verification

issues JWT for session

Match/Arena manager

assigns players to a running arena instance/region

Simulation engine

tick loop (20–30 ticks/s)

state replication (snapshots)

Event pipeline

kill events + signing + tx sending

retry logic + idempotency safeguards

Anti-abuse

rate limiting inputs

disconnect policy (timeout → frozen → killable)

Must NOT do

No custody of private keys that control funds (only attestor signing key)

No accepting client-reported positions

No trusting the client to declare kills

“Done” checkpoint for System C

You can connect 2–10 clients, move, eat, and see kill events posted to chain reliably.

System D — Web Client (Wallet + Gameplay + Cashout UX) Purpose
Player interface. Handles wallet, shows balances, plays the game, and triggers exits.

Responsibilities

Wallet connect (Solana Wallet Adapter)

Sign-in message for session auth

Deposit / withdraw flows

Join arena:

call join_arena on-chain

connect to server and start game

Gameplay loop:

send inputs (direction, split)

render server snapshots

Exit & cashout:

button calls exit_and_cashout

disconnect from server

return to lobby with updated balances

Must NOT do

No authoritative simulation

No client-side kill decisions

No storing secrets besides session token

“Done” checkpoint for System D

A player can:

deposit → join → play → exit & cashout → withdraw all from the browser.

System E — Indexer + Database (Leaderboards + Auditing) Purpose
Read chain truth and build fast queries + history.

Responsibilities

Subscribe to your program logs / transactions

Persist to Postgres:

deposits, withdrawals

joins, exits

kill transfers (victim→killer)

fees

per-wallet net profit

Provide API endpoints:

leaderboards

match history

user stats

Data ownership

On-chain is source of truth

DB is a read-optimized cache/index

Must NOT do

No writing payouts

No being required for contract safety (only for UX)

“Done” checkpoint for System E

Leaderboard page loads in <200ms with correct results compared to chain.

System F — Hardening & Operations (Anti-abuse + Key Mgmt + Monitoring) Purpose
Make it production safe and stable.

Responsibilities

Rate limits and DDoS protection

Attestor key security:

KMS/HSM where possible

rotation procedure

allowlist updates on-chain

Monitoring:

server tick latency

WebSocket connection health

tx success rates

unusual payout patterns

Emergency controls:

pause joins/kills (but withdrawals still allowed)

Fraud analytics:

collusion detection signals

multi-account farming patterns

Must NOT do

No “admin can reclaim user funds” backdoor

“Done” checkpoint for System F

You can survive disconnect storms, tx congestion, and key rotation without breaking funds.

The MVP milestone (your first real checkpoint) MVP Goal: “End-to-end money loop with a minimal game”

To call MVP complete, you should be able to demonstrate:

Player deposits wSOL

Player joins arena with stake

Two players play; one eats the other

Kill posts to chain (server signed)

Winner clicks “Exit & Cashout” and receives claim

Winner withdraws to wallet

Loser cannot withdraw locked amount (it was transferred)

If you can do that, your architecture is real.

Recommended build order (so you don’t waste months)

System A (program) + System B (attestation format)

Minimal System C server that can sign & submit kill events

Minimal System D client with deposit/join/exit

System E indexer for leaderboards

System F hardening
