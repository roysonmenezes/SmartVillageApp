// import { useState, useEffect } from 'react';
// import { web3Service } from '../services/web3Service';
// import type { Fund } from '../types/contracts';

// export const useDonation = () => {
//   const [funds, setFunds] = useState<Fund[]>([]);
//   const [balance, setBalance] = useState('0');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const [fundsData, walletBalance] = await Promise.all([
//         web3Service.getFunds(),
//         web3Service.getBalance()
//       ]);
      
//       setFunds(fundsData);
//       setBalance(walletBalance);
//     } catch (err) {
//       setError('Failed to load blockchain data');
//       console.error('Blockchain error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const donate = async (fundId: number, amount: string) => {
//     const tx = await web3Service.donate(fundId, amount);
//     await tx.wait(); // Wait for confirmation
//     await loadData(); // Refresh data
//     return tx;
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   return {
//     funds,
//     balance,
//     loading,
//     error,
//     donate,
//     refresh: loadData,
//     walletAddress: web3Service.getWalletAddress()
//   };
// };


// blockchain/hooks/useDonation.ts
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { web3Service } from '../services/web3Service';
import type { Fund } from '../types/contracts';

export const useDonation = () => {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await web3Service.initialize();
      
      const [fundsData, walletBalance] = await Promise.all([
        web3Service.getFunds(),
        web3Service.getBalance()
      ]);
      
      setFunds(fundsData);
      setBalance(walletBalance);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
      console.error('Blockchain error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Handle ContractTransactionResponse
  const donate = async (fundId: number, amount: string) => {
    try {
      // This returns ContractTransactionResponse
      const tx = await web3Service.donate(fundId, amount);
      
      console.log('Transaction sent:', tx.hash);
      
      // ✅ v6 way to wait for confirmation
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt?.hash);
      
      // Refresh data after confirmation
      await loadData();
      
      return tx;
    } catch (error: any) {
      console.error('Donation failed:', error);
      throw new Error(error.message || 'Donation failed');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    funds,
    balance,
    loading,
    error,
    donate,
    refresh: loadData,
    walletAddress: web3Service.getWalletAddress()
  };
};
