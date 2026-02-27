use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_instruction;

declare_id!("DFrhB33PvWktuHk38Ky9kGyyziBbpzHS6G9xNDC1gFLw");

#[program]
pub mod nomnom_agar {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let config = &mut ctx.accounts.config;
        config.admin = ctx.accounts.admin.key();
        config.signer_authority = ctx.accounts.signer_authority.key();
        config.fee_basis_points = 1000; // 10%
        Ok(())
    }

    pub fn join_pool(ctx: Context<JoinPool>, amount: u64) -> Result<()> {
        let config = &ctx.accounts.config;
        

        let fee = (amount * config.fee_basis_points as u64) / 10000;
        let deposit_amount = amount - fee;


        let ix_fee = system_instruction::transfer(
            &ctx.accounts.player.key(),
            &ctx.accounts.admin_treasury.key(),
            fee,
        );
        anchor_lang::solana_program::program::invoke(
            &ix_fee,
            &[
                ctx.accounts.player.to_account_info(),
                ctx.accounts.admin_treasury.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;


        let ix_deposit = system_instruction::transfer(
            &ctx.accounts.player.key(),
            &ctx.accounts.game_pool.key(),
            deposit_amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix_deposit,
            &[
                ctx.accounts.player.to_account_info(),
                ctx.accounts.game_pool.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;


        emit!(PlayerEntered {
            player: ctx.accounts.player.key(),
            amount_deposited: deposit_amount,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }


    pub fn leave_pool(ctx: Context<LeavePool>, amount: u64, server_signature: [u8; 64]) -> Result<()> {

        require!(ctx.accounts.server_authority.is_signer, GameError::InvalidServerSignature);

        let game_pool = &mut ctx.accounts.game_pool;


        **game_pool.to_account_info().try_borrow_mut_lamports()? -= amount;
        **ctx.accounts.player.to_account_info().try_borrow_mut_lamports()? += amount;

        emit!(PlayerLeft {
            player: ctx.accounts.player.key(),
            amount_withdrawn: amount,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = admin, space = 8 + 32 + 32 + 8, seeds = [b"config"], bump)]
    pub config: Account<'info, Config>,

    #[account(mut)]
    pub admin: Signer<'info>,

    pub signer_authority: AccountInfo<'info>, 
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinPool<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut, seeds = [b"pool"], bump)]

    pub game_pool: AccountInfo<'info>,
    #[account(mut, address = config.admin)]

    pub admin_treasury: AccountInfo<'info>,
    #[account(seeds = [b"config"], bump)]
    pub config: Account<'info, Config>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct LeavePool<'info> {
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut, seeds = [b"pool"], bump)]

    pub game_pool: AccountInfo<'info>,
    #[account(address = config.signer_authority)]

    pub server_authority: Signer<'info>,
    #[account(seeds = [b"config"], bump)]
    pub config: Account<'info, Config>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Config {
    pub admin: Pubkey,
    pub signer_authority: Pubkey,
    pub fee_basis_points: u16,
}

#[error_code]
pub enum GameError {
    #[msg("Server signature required for withdrawal.")]
    InvalidServerSignature,
}

#[event]
pub struct PlayerEntered {
    pub player: Pubkey,
    pub amount_deposited: u64,
    pub timestamp: i64,
}

#[event]
pub struct PlayerLeft {
    pub player: Pubkey,
    pub amount_withdrawn: u64,
}