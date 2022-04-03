const anchor = require("@project-serum/anchor");
const provider = anchor.Provider.local();
// Configure the cluster.
anchor.setProvider(provider);
const args = require('minimist')(process.argv.slice(2));

async function main() {
 // Read the generated IDL.
 const idl = JSON.parse(
   require("fs").readFileSync("../target/idl/gm_anchor.json", "utf8")
 );

 // Address of the deployed program.
 const programId = new anchor.web3.PublicKey(args['program']);
 const name = args['name'] || "Glass Chewer";
 

 // Generate the program client from IDL.
 const program = new anchor.Program(idl, programId);

 //create an account to store the GM name
 const gmAccount = anchor.web3.Keypair.generate();
//  {console.log(gmAccount)}

 console.log('GM account public key: ' + gmAccount.publicKey);
 console.log('user public key: ' + provider.wallet.publicKey);

 // Execute the RPC.
 let tx = await program.rpc.execute(name,{
   accounts: {
     gmAccount: gmAccount.publicKey,
     user: provider.wallet.publicKey,
     systemProgram: anchor.web3.SystemProgram.programId
   },
   options: { commitment: "confirmed" },
   signers: [gmAccount],
 });

 console.log("Fetching transaction logs...");
 let t = await provider.connection.getConfirmedTransaction(tx, "confirmed");
 console.log(t.meta.logMessages);
 // #endregion main

 // Fetch the account details of the account containing the price data
 const storedName = await program.account.greetingAccount.fetch(gmAccount.publicKey);
 console.log('Stored GM Name Is: ' + storedName.name)
}

console.log("Running client...");
main().then(() => console.log("Success"));