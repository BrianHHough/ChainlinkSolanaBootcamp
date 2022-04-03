// Parse arguments
// --program - [Required] The account address for your deployed program.
// --action - Create or Update a tweet
// --title - [Required] The title of the post
// --content - [Required] The content of the post
// --post - [Required] The account address of the post you wish to update

const args = require('minimist')(process.argv.slice(2));


// Initialize Anchor and provider
const anchor = require("@project-serum/anchor");
const provider = anchor.Provider.env();
// Configure the cluster.
anchor.setProvider(provider);


//parse params
const PROGRAM_ID = args['program']  // Address of the deployed program.
const ACTION = args['action']  //action to take (create or update)
const TITLE = args['title']  //title of the post
const CONTENT = args['content']  //content of the post
const POST_ACCT = args['post']

console.log('Program ID:', PROGRAM_ID);
console.log('Action: ' + ACTION);
console.log('user public key: ' + provider.wallet.publicKey);
console.log('creating post title: ' + TITLE, 'content: ' + CONTENT);
console.log('post account: ' + POST_ACCT)


async function main() {
   // Read the generated IDL.
   const idl = JSON.parse(
       require("fs").readFileSync("../target/idl/solana_social.json", "utf8")
   );


   // Generate the program client from IDL.
   const programId = new anchor.web3.PublicKey(PROGRAM_ID);
   const program = new anchor.Program(idl, programId);

   let tx

   if (ACTION === 'create') {
       // Create a Post
       //create an account to store the post
       const postAccount = anchor.web3.Keypair.generate();
       console.log('postAccount public key: ' + postAccount.publicKey);

       tx = await program.rpc.createPost(TITLE, CONTENT, {
           accounts: {
               post: postAccount.publicKey,
               author: provider.wallet.publicKey,
               systemProgram: anchor.web3.SystemProgram.programId
           },
           options: { commitment: "confirmed" },
           signers: [postAccount],
       });


       console.log("Fetching transaction logs...");
       let t = await provider.connection.getConfirmedTransaction(tx, "confirmed");
       console.log(t.meta.logMessages);

       // Fetch the account details of the account containing the post
       const postData = await program.account.post.fetch(postAccount.publicKey);
       console.log('Title Is: ' + postData.title)
       console.log('Content Is: ' + postData.content)
   }

   else if (ACTION === 'update') {
       //Update a post
       tx = await program.rpc.updatePost(TITLE, CONTENT, {
           accounts: {
               post: POST_ACCT,
               author: provider.wallet.publicKey
           },
           options: { commitment: "confirmed" },
       });


       console.log("Fetching transaction logs...");
       let t = await provider.connection.getConfirmedTransaction(tx, "confirmed");
       console.log(t.meta.logMessages);

       // Fetch the account details of the account containing the post
       const postData = await program.account.post.fetch(POST_ACCT);
       console.log('Title Is: ' + postData.title)
       console.log('Content Is: ' + postData.content)

   } else {
       console.error('invalid action');
       return
   }

}

console.log("Running client...");
main().then(() => console.log("Success"));