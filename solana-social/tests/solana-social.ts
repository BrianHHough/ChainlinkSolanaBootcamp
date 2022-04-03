import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { SolanaSocial } from '../target/types/solana_social';

describe('solana-social', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaSocial as Program<SolanaSocial>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
