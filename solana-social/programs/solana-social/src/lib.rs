use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

declare_id!("HYdpEy49MieKAezaGGjJ9P6YA1SfugRkDb4s2cATWxst");

const DISCRIMINATOR_LENGTH: usize = 8;
const PUBLIC_KEY_LENGTH: usize = 32;
const TIMESTAMP_LENGTH: usize = 8;
const STRING_LENGTH_PREFIX: usize = 4; // Stores the size of the string.
const MAX_TITLE_LENGTH: usize = 100 * 4; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 500 * 4; // 280 chars max.

impl Post {
   const LEN: usize = DISCRIMINATOR_LENGTH
       + PUBLIC_KEY_LENGTH // Author.
       + TIMESTAMP_LENGTH // Timestamp.
       + STRING_LENGTH_PREFIX + MAX_TITLE_LENGTH // Topic.
       + STRING_LENGTH_PREFIX + MAX_CONTENT_LENGTH; // Content.
}

#[program]
pub mod solana_social {
   use super::*;
   pub fn create_post(ctx: Context<CreatePost>, title: String, content: String) -> ProgramResult {
       let post: &mut Account<Post> = &mut ctx.accounts.post;
       let author: &Signer = &ctx.accounts.author;
       let clock: Clock = Clock::get().unwrap();

       if title.chars().count() > 50 {
           return Err(ErrorCode::TitleLength.into())
       }

       if content.chars().count() > 280 {
           return Err(ErrorCode::ContentTooLong.into())
       }

       post.author = *author.key;
       post.timestamp = clock.unix_timestamp;
       post.title = title;
       post.content = content;

       Ok(())
   }

   pub fn update_post(ctx: Context<UpdatePost>, title: String, content: String) -> ProgramResult {
       let post: &mut Account<Post> = &mut ctx.accounts.post;

       if title.chars().count() > 50 {
           return Err(ErrorCode::TitleLength.into())
       }

       if content.chars().count() > 280 {
           return Err(ErrorCode::ContentTooLong.into())
       }

       post.title = title;
       post.content = content;

       Ok(())
   }
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
   #[account(init, payer = author, space = Post::LEN)]
   pub post: Account<'info, Post>,
   #[account(mut)]
   pub author: Signer<'info>,
   #[account(address = system_program::ID)]
   pub system_program: AccountInfo<'info>,
}

#[derive(Accounts)]
pub struct UpdatePost<'info> {
   #[account(mut, has_one = author)]
   pub post: Account<'info, Post>,
   pub author: Signer<'info>,
}

#[account]
pub struct Post {
   pub author: Pubkey,
   pub title: String,
   pub content: String,
   pub timestamp: i64,
}

#[error]
pub enum ErrorCode {
   #[msg("The provided title should be 50 characters long maximum.")]
   TitleLength,
   #[msg("The provided content should be 280 characters long maximum.")]
   ContentTooLong,
}