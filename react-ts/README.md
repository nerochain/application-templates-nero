# Nerochain dApp Template

This template provides a starting point for building decentralized applications on Nerochain with Account Abstraction.

## Features

- Connect to user wallets with MetaMask
- Generate Account Abstraction wallets
- Mint NFTs with gas fees sponsored by a Paymaster
- Support multiple payment options (free, prepay, postpay)

## Getting Started

1. Clone this repository:
```bash
git clone <repository-url>
cd nero-dapp-template
```

2. Install dependencies:
```bash
npm install
```

3. Create an environment file:
```bash
cp .env.example .env
```

4. Edit the `.env` file and add your Paymaster API key and NFT contract address.

5. Start the development server:
```bash
npm start
```

## Project Structure

- `src/components/` - React components
  - `WalletConnect.tsx` - Wallet connection component
  - `NFTMinter.tsx` - NFT minting component
  - `PaymentTypeSelector.tsx` - Payment selection component
- `src/utils/` - Utility functions
  - `aaUtils.ts` - Account Abstraction utilities
  - `errorHandler.ts` - Error handling utilities
- `src/App.tsx` - Main application component
- `src/config.ts` - Configuration settings

## Implementation

Follow the tutorial at [Creating Your First dApp on Nerochain](/path/to/tutorial) to implement the functionality. The template files contain placeholder implementations that you'll replace with working code as you progress through the tutorial.

## Resources

- [Nerochain Documentation](https://docs.nerochain.io/)
- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)
- [AA-UserOp SDK GitHub](https://github.com/nerochain/aa-userop-sdk)
- [Nerochain Block Explorer](https://testnet.neroscan.io/) 