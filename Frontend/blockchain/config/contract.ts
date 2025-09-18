export const CONTRACT_ADDRESSES = {
  DONATION_ROUTER: '0xFEd6C332E6E9667eDc4494d0644C2e3Fe2AAc9D5'
} as const;

export const getContractConfig = () => ({
  address: CONTRACT_ADDRESSES.DONATION_ROUTER,
  network: 'sepolia'
});
