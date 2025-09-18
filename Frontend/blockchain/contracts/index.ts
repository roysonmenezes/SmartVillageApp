import DonationRouterContract from './DonationRouterABI.json';

// Export the contract configuration
export const CONTRACTS = {
  DONATION_ROUTER: {
    address: DonationRouterContract.networks.sepolia.address,
    abi: DonationRouterContract.abi
  }
} as const;

// Export individual parts for flexibility
export const DonationRouterABI = DonationRouterContract.abi;
export const getDonationRouterAddress = () => DonationRouterContract.networks.sepolia.address;

// Type definitions for the contract
export type DonationRouterABI = typeof DonationRouterContract.abi;
