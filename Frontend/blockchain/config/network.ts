export const NETWORKS = {
  sepolia: {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/a6b7ac7118aa4c92b60b2bd961c8de4f',
    blockExplorer: 'https://sepolia.etherscan.io',
    currency: 'SepoliaETH',
    // Explicit ENS registry address for Sepolia
    ensRegistry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
  }
} as const;

export const PROTOTYPE_CONFIG = {
  // Hardcoded test wallet (TESTING ONLY)
  TEST_DONOR: {
    privateKey: '6d0d831737940dd412aff2a1d741a9bc85bdc44f214962ee9e5474f8c3977a54',
    address: '0xF177046918CA0ac064f4D9E6284A63F53c479649'
  },
  NETWORK: NETWORKS.sepolia
} as const;
