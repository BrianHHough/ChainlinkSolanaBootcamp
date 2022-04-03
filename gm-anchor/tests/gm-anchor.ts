import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { GmAnchor } from '../target/types/gm_anchor';

describe('gm-anchor', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.GmAnchor as Program<GmAnchor>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({});
    console.log("Your transaction signature", tx);
  });
});
