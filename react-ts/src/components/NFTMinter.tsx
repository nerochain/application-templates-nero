import React, { useState, useEffect } from 'react';
import { mintNFT, getSupportedTokens, initAAClient, initAABuilder } from '../utils/aaUtils';
import PaymentTypeSelector from './PaymentTypeSelector';
import { ethers } from 'ethers';

interface NFTMinterProps {
  signer?: ethers.Signer;
  aaWalletAddress?: string;
}

/**
 * Component to mint NFTs using Account Abstraction
 */
const NFTMinter: React.FC<NFTMinterProps> = ({ signer, aaWalletAddress }) => {
  // NFT form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Payment type state
  const [paymentType, setPaymentType] = useState(0);
  const [selectedToken, setSelectedToken] = useState('');
  const [supportedTokens, setSupportedTokens] = useState<Array<any>>([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isFetchingTokens, setIsFetchingTokens] = useState(false);

  // Load supported tokens when component mounts and signer is available
  useEffect(() => {
    // Only run if signer is defined and has the required method
    if (signer && typeof signer.getAddress === 'function') {
      fetchSupportedTokens();
    }
  }, [signer]);

  /**
   * Fetch supported tokens from paymaster
   * TODO: Implement this function to fetch supported tokens
   */
  const fetchSupportedTokens = async () => {
    if (!signer) {
      console.log("Signer not available");
      return;
    }

    // Verify signer has getAddress method
    if (typeof signer.getAddress !== 'function') {
      console.error("Invalid signer: missing getAddress method");
      setError("Wallet connection issue: please reconnect your wallet");
      return;
    }

    try {
      setIsFetchingTokens(true);
      setError(null);

      // This is a placeholder implementation
      // Replace with your implementation based on the tutorial
      const client = await initAAClient(signer);
      const builder = await initAABuilder(signer);
      
      // Fetch supported tokens
      const tokens = await getSupportedTokens(client, builder);
      setSupportedTokens(tokens);
    } catch (error: any) {
      console.error("Error fetching supported tokens:", error);
      setError(`Token loading error: ${error.message || "Unknown error"}`);
    } finally {
      setIsFetchingTokens(false);
    }
  };

  /**
   * Handle payment type change
   */
  const handlePaymentTypeChange = (type: number, token?: string) => {
    setPaymentType(type);
    if (token) {
      setSelectedToken(token);
    } else {
      setSelectedToken('');
    }
  };

  /**
   * Mint an NFT
   * TODO: Implement this function to mint an NFT
   */
  const handleMint = async () => {
    if (!signer) {
      setError("Please connect your wallet first");
      return;
    }

    // Validate signer has getAddress method
    if (typeof signer.getAddress !== 'function') {
      setError("Wallet connection issue: please reconnect your wallet");
      return;
    }

    if (!aaWalletAddress) {
      setError("AA wallet not initialized");
      return;
    }

    if (!name) {
      setError("Please enter a name for your NFT");
      return;
    }

    // Clear previous state
    setError(null);
    setTxHash(null);
    setIsLoading(true);

    try {
      // Create metadata
      const metadata = {
        name,
        description,
        image: "https://example.com/placeholder.png"
      };
      const metadataUri = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;

      // This is a placeholder implementation
      // Replace with your implementation based on the tutorial
      const result = await mintNFT(
        signer,
        aaWalletAddress,
        metadataUri,
        paymentType,
        selectedToken
      );

      // Set transaction hash
      setTxHash(result.transactionHash);

      // Reset form on success
      setName('');
      setDescription('');

    } catch (error: any) {
      console.error("Error minting NFT:", error);
      setError(error.message || "Failed to mint NFT");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="nft-minter-container">
      <h2>Mint Your NFT</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="form-container">
        <div className="form-group">
          <label htmlFor="nft-name">NFT Name:</label>
          <input
            id="nft-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for your NFT"
            disabled={isLoading}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="nft-description">Description:</label>
          <textarea
            id="nft-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description (optional)"
            disabled={isLoading}
            rows={3}
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label>Payment Method:</label>
          <PaymentTypeSelector
            paymentType={paymentType}
            setPaymentType={handlePaymentTypeChange}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            supportedTokens={supportedTokens}
            isLoading={isFetchingTokens}
          />
        </div>

        <button
          onClick={handleMint}
          disabled={isLoading || !name || !signer || !aaWalletAddress}
          className="mint-button"
        >
          {isLoading ? "Minting..." : "Mint NFT"}
        </button>
      </div>

      {txHash && (
        <div className="success-message">
          <p>NFT minted successfully!</p>
          <a
            href={`https://testnet.neroscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="explorer-link"
          >
            View on Explorer
          </a>
        </div>
      )}
    </div>
  );
};

export default NFTMinter; 