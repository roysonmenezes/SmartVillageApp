// blockchain/services/web3Service.ts
import { ethers } from 'ethers';
import { CONTRACTS } from '../contracts';
import { PROTOTYPE_CONFIG } from '../config/network';
import type { Fund } from '../types/contracts';
import type { Web3ServiceInterface } from '../types/web3';

class Web3Service implements Web3ServiceInterface {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;

  constructor() {
    // ✅ Simple provider setup for v6
    this.provider = new ethers.JsonRpcProvider(
      PROTOTYPE_CONFIG.NETWORK.rpcUrl,
      PROTOTYPE_CONFIG.NETWORK.chainId
    );
    
    this.wallet = new ethers.Wallet(
      PROTOTYPE_CONFIG.TEST_DONOR.privateKey,
      this.provider
    );
    
    this.contract = new ethers.Contract(
      CONTRACTS.DONATION_ROUTER.address,
      CONTRACTS.DONATION_ROUTER.abi,
      this.wallet
    );
  }

  async initialize(): Promise<void> {
    try {
      const blockNumber = await this.provider.getBlockNumber();
      console.log('✅ Connected to block:', blockNumber);
    } catch (error) {
      console.error('❌ Connection failed:', error);
      throw error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Balance error:', error);
      throw new Error('Failed to get balance');
    }
  }

  async getFunds(): Promise<Fund[]> {
    try {
      const fundsCount = await this.contract.getFundsCount();
      const funds: Fund[] = [];
      
      for (let i = 0; i < Number(fundsCount); i++) {
        const [name, payoutWallet, totalDonated, donationCount] = 
          await this.contract.getFund(i);
        
        funds.push({
          id: i,
          name: String(name),
          payoutWallet: String(payoutWallet),
          totalDonated: ethers.formatEther(totalDonated),
          donationCount: Number(donationCount)
        });
      }
      
      return funds;
    } catch (error) {
      console.error('Get funds error:', error);
      throw new Error('Failed to load funds');
    }
  }

  // ✅ CORRECT: Returns ContractTransactionResponse (v6 type)
  async donate(fundId: number, amount: string): Promise<ethers.ContractTransactionResponse> {
    try {
      const value = ethers.parseEther(amount);
      
      // Optional: Add gas estimation
      const gasEstimate = await this.contract.donate.estimateGas(fundId, { value });
      
      const tx = await this.contract.donate(fundId, { 
        value,
        gasLimit: gasEstimate + BigInt(50000) // Add buffer
      });
      
      return tx; // ✅ This is ContractTransactionResponse
    } catch (error) {
      console.error('Donation error:', error);
      throw new Error('Donation failed');
    }
  }

  getWalletAddress(): string {
    return this.wallet.address;
  }

  getTransactionUrl(txHash: string): string {
    return `${PROTOTYPE_CONFIG.NETWORK.blockExplorer}/tx/${txHash}`;
  }
}

export const web3Service = new Web3Service();
