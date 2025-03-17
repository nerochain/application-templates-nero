import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalletConnect from './components/WalletConnect';
import NFTMinter from './components/NFTMinter';
import { ethers } from 'ethers';
import './App.css';

/**
 * Main application component
 */
const App: React.FC = () => {
  // State to track wallet connection
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [eoaAddress, setEoaAddress] = useState<string>('');
  const [aaAddress, setAaAddress] = useState<string>('');
  
  /**
   * Handle wallet connection
   * TODO: Implement this function to get a real signer from the wallet
   */
  const handleWalletConnected = (eoaAddr: string, aaAddr: string) => {
    // This is a placeholder for the real signer
    // In a real app, you should get the actual signer from the wallet
    const mockSigner = {} as ethers.Signer;
    
    setEoaAddress(eoaAddr);
    setAaAddress(aaAddr);
    setSigner(mockSigner);
    
    toast.success('Wallet connected successfully!');
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>NERO Chain dApp with Account Abstraction</h1>
      </header>
      
      <main className="app-main">
        <section className="wallet-section">
          <WalletConnect onWalletConnected={handleWalletConnected} />
        </section>
        
        {aaAddress && (
          <section className="nft-section">
            <NFTMinter 
              signer={signer} 
              aaWalletAddress={aaAddress} 
            />
          </section>
        )}
        
        {!aaAddress && (
          <section className="info-section">
            <div className="connect-prompt">
              <h3>Welcome to the Nerochain AA Template</h3>
              <p>Connect your wallet to get started with Account Abstraction.</p>
              <p>This template demonstrates:</p>
              <ul>
                <li>Connecting and generating AA wallets</li>
                <li>Using Paymasters for gas-free transactions</li>
                <li>Minting NFTs with various payment options</li>
                <li>Working with ERC20 tokens</li>
              </ul>
            </div>
          </section>
        )}
      </main>
      
      <footer className="app-footer">
        <p>
          Powered by Nerochain - <a href="https://docs.nerochain.io/" target="_blank" rel="noreferrer">Documentation</a>
        </p>
      </footer>
      
      {/* Toast notifications container */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App; 