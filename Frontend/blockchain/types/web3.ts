import { ethers } from 'ethers';
import type { Fund } from './contracts';

// export interface Web3ServiceInterface {
  // getBalance(): Promise<string>;
  // getFunds(): Promise<Fund[]>;
  // donate(fundId: number, amount: string): Promise<ethers.ContractTransaction>;
  // getWalletAddress(): string;
// }


// ✅ UPDATED: Use v6 types
export interface Web3ServiceInterface {
  getBalance(): Promise<string>;
  getFunds(): Promise<Fund[]>;
  // ✅ CHANGED: ContractTransaction → ContractTransactionResponse
  donate(fundId: number, amount: string): Promise<ethers.ContractTransactionResponse>;
  getWalletAddress(): string;
}
