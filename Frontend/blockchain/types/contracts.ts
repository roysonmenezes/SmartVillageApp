export interface Fund {
  id: number;
  name: string;
  payoutWallet: string;
  totalDonated: string;
  donationCount: number;
}

export interface DonationTransaction {
  hash: string;
  fundId: number;
  amount: string;
  donor: string;
  timestamp?: number;
  status: 'pending' | 'confirmed' | 'failed';
}
