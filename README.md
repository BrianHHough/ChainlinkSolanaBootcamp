<img src="./assets//ChainlinkSolanaBootcamp.png" width="65%" alt="Chainlink Oracle Technical Bootcamp Solana Blockchain Rust Lang">
<!-- ![ChainlinkSolana](./assets//ChainlinkSolanaBootcamp.png) -->

# <b> Chainlink x Solana 2022 Bootcamp </b>

2022 Technical Blockchain Developer Bootcamp program put on by the Chainlink Labs Team to educate developers on the fundamental building blocks of building dapps on the Solana blockchain, using Rust as the smart contract programming language, and implementing Chainlink's verifiable oracle networks to verify and validate off-chain data on-chain on the blockchain.

## Tech Stack:

- **Rust:** smart contract programming language
- **TypeScript/JavaScript:** running the dapp/clients/scripts
- **Anchor:** framework for Solana abstraction to build dapps
- **Chainlink:** Oracle network for off-chain data verification

<!-- <img src="./assets/Day1.png" width="75%" alt="Chainlink Oracle Technical Bootcamp Solana Blockchain Rust Lang"> -->

# Part 1: Introduction

## Key Learnings:

- Rust as a programming language for smart contracts
- Solana as a computationally efficient, fast, and secure public blockchain network
- Using the Solana CLI to build a token-based dapp
- Learning Solana's value proposition, as explained by CEO Anatoly Yakavenko on "chewing glass":
  - why is there transaction size limit?
  - why do we have to specify all the accounts for every smart contract call?
  - why do we have to code with no global memory?
  - why not make a computationally efficient blockchain network that solves all of these current issues (Solana)?
- Key benefits to Solana:
  - open-sourced, permissionless, decentralized
  - Approximately 1,500 nodes capable of 50k TPS
  - BFT PoS consensus mechanism
  - "Proof of History" to maintain state
  - No mempool - uses "Gulf-Stream" to forward transactions to future 'leaders'
  - Clients/off-chain dapps communicate with on-chain Solana programs with the JSON RPC API or an API-compatible SDK

## Projects Built:

- GM App: [`gm-program`](gm-program)
- Token Program [`token-program`](token-program)

<!-- <img src="./assets/Day2.png" width="75%" alt="Chainlink Oracle Technical Bootcamp Solana Blockchain Rust Lang"> -->

# <b>Part 2: Anchor & Chainlink</b>

## Key Learnings:

- Using the Project Serum Anchor Framework to build Solana dapps
- How Solana smart contracts are deployed as "Data Files" and these data files receive SOL to run compute (compared to the EVM-compatible frameworks where a wallet "does work to" or "on behalf of" a smart contract)
- When you deploy your Rust smart contracts, you can also interact with them via a JS client to create an item (i.e. a social media post), and generate a public key for that item and then use that public key to update its state.
- Chainlink solves the data verification issue, especially in reaching consensus, off-chain so that it can be brought into a smart contract even though the blockchain is deterministic.
- Chainlink solves the Oracle Problem by:
  - allowing off-chain data to be verified in a deterministic way (something that the blockchain natively cannot do).
  - getting external data or computation into smart contracts directly
- When I ran the contract of the Chainlink price feed for SOL/USD - I received `Price Is: 135.51092534` in the console.
  - At the same time, CoinMarketCap reported $135.47, CoinGecko at $135.57, Coinbase at $135.46, and Gemini at $135.61.
  - Between these 4 prices, they can't "all be right" so what Chainlink's verified data feeds provides is an independently verifiable consensus answer around something that could be right or wrong by many different groups of people at once.
- Chainlink brings with it a decentralized Oracle Network, run & operated by independent & sybil resistant node operators to reach consensus (agreement) about a certain data, item, or computation.
  - This is how we can get one, single Solana price in our Rust Lang smart contract, which is right in the middle of these other data points - which makes sense for how data can (and should) be reported, especially if it can differ between parties that could lead to costly/egregious mistakes or errors.

## Projects Built:

- GM App (with Anchor Framework): [`gm-anchor`](gm-anchor)
- Social Media App (with Anchor): [`solana-social`](solana-social)
- Chainlink Price Data Feeds Dapp: [`solana-chainlink`](solana-chainlink)
