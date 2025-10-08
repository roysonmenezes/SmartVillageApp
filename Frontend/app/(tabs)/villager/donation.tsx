import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// 1. Import the AppKitButton component
import { AppKitButton } from "@reown/appkit-wagmi-react-native";
// 2. Import Wagmi hooks for wallet status
import { useAccount, useBalance } from 'wagmi'; 

export default function Donation() {
  // Use Wagmi's useAccount hook to get the connection status and address
  const { address, isConnected } = useAccount();
  
  // Optional: Fetch the balance to show off a little more functionality
  const { data: balanceData } = useBalance({ address });

  // Placeholder function for your donation logic
  const handleDonate = () => {
    if (!isConnected) {
      Alert.alert("Wallet Required", "Please connect your wallet to proceed with the donation.");
      return;
    }
    
    // 
    // TODO: Implement your wagmi transaction logic here (e.g., useSendTransaction)
    //
    Alert.alert("Donation Initiated", `Attempting to send donation from ${address}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Make a Donation</Text>
      <Text style={styles.subHeading}>Support Our Smart Village Project</Text>
      
      {/* ------------------------------------------- */}
      {/* 3. Conditional Rendering: Connect or Status */}
      {/* ------------------------------------------- */}

      <View style={styles.walletSection}>
        {isConnected ? (
          <View style={styles.connectedBox}>
            <Text style={styles.statusText}>Wallet Connected:</Text>
            <Text style={styles.addressText}>
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
            </Text>
            {balanceData && (
              <Text style={styles.balanceText}>
                Balance: {parseFloat(balanceData.formatted).toFixed(4)} {balanceData.symbol}
              </Text>
            )}
            
            {/* The AppKitButton automatically turns into a 'disconnect/profile' button when connected */}
            <View style={styles.buttonWrapper}>
              <AppKitButton /> 
            </View>
          </View>
        ) : (
          <View style={styles.disconnectedBox}>
            <Text style={styles.statusText}>Please connect your wallet to donate.</Text>
            
            {/* The AppKitButton is a 'Connect Wallet' button when disconnected */}
            <View style={styles.buttonWrapper}>
              <AppKitButton />
            </View>
          </View>
        )}
      </View>
      
      {/* ------------------------------------------- */}
      {/* 4. Donation Button (Enabled only if connected) */}
      {/* ------------------------------------------- */}
      <TouchableOpacity
        style={[styles.donateButton, !isConnected && styles.donateButtonDisabled]}
        onPress={handleDonate}
        disabled={!isConnected}
      >
        <Text style={styles.donateButtonText}>
          {isConnected ? 'Donate 1 ETH' : 'Connect to Donate'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subHeading: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  walletSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  connectedBox: {
    backgroundColor: '#E6FFE6', // Light green for success
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
    width: '90%',
  },
  disconnectedBox: {
    backgroundColor: '#FFEEEE', // Light red for warning/disconnected
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F44336',
    alignItems: 'center',
    width: '90%',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 5,
  },
  balanceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 10,
    // The AppKitButton handles its own styling, but we wrap it for spacing.
  },
  donateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  donateButtonDisabled: {
    backgroundColor: '#A0A0A0', // Gray out when disabled
  },
  donateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});