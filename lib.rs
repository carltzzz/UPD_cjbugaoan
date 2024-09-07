use anchor_lang::prelude::*;

declare_id!("AVhi6aUWRwRnAkC3PgmEviFctYErZPoAuVwSy3mutkUf");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        ctx.accounts.new_account.data = data;
        msg!("Changed data to: {}!", data);
        Ok(())
    }

    pub fn enroll(ctx: Context<Enroll>, first_name: String, last_name: String) -> Result<()> {
        ctx.accounts.enrollment.first_name = first_name;
        ctx.accounts.enrollment.last_name = last_name;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 8)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Enroll<'info> {
    #[account(init, payer = signer, space = 8 + 36 + 36)]
    pub enrollment: Account<'info, Enrollment>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NewAccount {
    data: u64,
}

#[account]
pub struct Enrollment {
    first_name: String,
    last_name: String,
}
