// Web3Provider.tsx (New File)
import "@walletconnect/react-native-compat";
import { WagmiProvider } from "wagmi";
import React from 'react';
import { mainnet, polygon, arbitrum } from "@wagmi/core/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from "@reown/appkit-wagmi-react-native";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://dashboard.reown.com - **REPLACE THIS**
const projectId = "3ba56a6e11d1f233b65f68da30afde62"; 

// 2. Create config
const metadata = {
  name: "AppKit RN",
  description: "AppKit RN Example",
  url: "https://reown.com/appkit",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    // **REPLACE THESE SCHEMES** - They must match your deep linking setup
    native: "myapp://", 
    universal: "smartvillageapp.com", 
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal (This initializes the WalletConnect/AppKit modal)
if (!(global as any).__APPKIT_INITIALIZED__) {
  createAppKit({
    projectId,
    metadata,
    wagmiConfig,
    defaultChain: mainnet, 
    enableAnalytics: true, 
  });
  (global as any).__APPKIT_INITIALIZED__ = true;
}



// The provider component that wraps your app content
export default function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {/* Render the rest of the application */}
        {children}
        {/* The AppKit component must be rendered to show the connection modal */}
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// NOTE: You must export and render the AppKit component inside the providers 
// and inside the component that gets wrapped by the providers.
export { AppKit };