# Nerochain Application Templates

A collection of starter templates for building decentralized applications on Nerochain. These templates are designed to help developers quickly bootstrap projects with best practices and common functionality already integrated.

## Available Templates

### React TypeScript Template (`react-ts`)

A modern React application with TypeScript support, pre-configured for building Nerochain dApps with Account Abstraction features.

**Features:**
- Connect to user wallets with MetaMask
- Generate Account Abstraction wallets
- Mint NFTs with gas fees sponsored by a Paymaster
- Support multiple payment options (free, prepay, postpay)
- TypeScript for type safety
- Ready-to-use component structure

## Getting Started

### Using a Template

1. Clone this repository:
   ```bash
   git clone https://github.com/nerochain/application-templates-nero.git
   ```

2. Copy the template you want to use:
   ```bash
   cp -r application-templates-nero/react-ts my-nerochain-app
   cd my-nerochain-app
   ```

3. Initialize a new git repository (optional):
   ```bash
   rm -rf .git
   git init
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Follow the template-specific README for additional setup instructions.

## Template-Specific Documentation

Each template directory contains its own README with detailed instructions and information about the template's features.

- [React TypeScript Template Documentation](react-ts/README.md)

## Contributing

Contributions are welcome! If you have ideas for improving the existing templates or want to add new templates, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-template`)
3. Commit your changes (`git commit -m 'Add some amazing template'`)
4. Push to the branch (`git push origin feature/amazing-template`)
5. Open a Pull Request

## Future Templates

We plan to add more templates in the future, including:
- Vue.js with TypeScript
- Next.js applications
- React Native mobile apps
- Solidity smart contract templates

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details. 
