import React, { useState, useEffect } from 'react';
import { getSigner, getAAWalletAddress } from '../utils/aaUtils';

interface WalletConnectProps {
  onWalletConnected?: (eoaAddress: string, aaAddress: string) => void;
}

/**
 * Component to connect to user's wallet and display addresses
 */
const WalletConnect: React.FC<WalletConnectProps> = ({ onWalletConnected }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eoaAddress, setEoaAddress] = useState('');
  const [aaAddress, setAaAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Connect to wallet and get addresses
   * TODO: Implement this function to connect to the wallet and get addresses
   */
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // This is a placeholder implementation
      // Replace with your implementation based on the tutorial
      const signer = await getSigner();
      
      // Get EOA address
      const address = await signer.getAddress();
      setEoaAddress(address);
      
      // Get AA wallet address
      const aaWalletAddress = await getAAWalletAddress(signer);
      setAaAddress(aaWalletAddress);
      
      // Update state
      setIsConnected(true);
      
      // Call callback if provided
      if (onWalletConnected) {
        onWalletConnected(address, aaWalletAddress);
      }
      
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      setError(error.message || "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Disconnect wallet
   */
  const disconnectWallet = () => {
    setIsConnected(false);
    setEoaAddress('');
    setAaAddress('');
  };

  // Check if wallet is already connected on component mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      // Check if ethereum is available and accounts are connected
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            await connectWallet();
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });
    }
    
    return () => {
      // Clean up event listeners
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return (
    <div className="wallet-container">
      <h2>Account Abstraction Wallet</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="connect-section">
        {!isConnected ? (
          <button 
            onClick={connectWallet}
            disabled={isLoading}
            className="connect-button"
          >
            {isLoading ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <button
            onClick={disconnectWallet}
            className="disconnect-button"
          >
            Disconnect
          </button>
        )}
      </div>
      
      {isConnected && (
        <div className="wallet-info">
          <div className="address-item">
            <strong>EOA Address:</strong> 
            <span className="address">{eoaAddress}</span>
          </div>
          <div className="address-item">
            <strong>AA Wallet Address:</strong> 
            <span className="address">{aaAddress}</span>
          </div>
          <p className="note">
            This AA wallet is counterfactual and will be deployed on your first transaction.
          </p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect; 