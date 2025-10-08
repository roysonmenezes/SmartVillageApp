import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { AppKitButton } from "@reown/appkit-wagmi-react-native";
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, Address } from 'viem';

// --- CONFIGURATION ---
// Define the type for the fund addresses object
const FUND_ADDRESSES: {
  education: Address;
  infrastructure: Address;
} = {
  // Use 'as Address' to assert the string is a valid Ethereum address format (Hex string)
  education: "0x4b94f004eD72ef27eb6cefA4805e7CD54260C98b" as Address, 
  infrastructure: "0xE754A73B2291597b1eCa22738722b248dF0C55E0" as Address, 
};

// Define a type for the valid keys of the FUND_ADDRESSES object
type FundKey = keyof typeof FUND_ADDRESSES;

// Define a type for the FundSelector component's props
interface FundSelectorProps {
  fundName: FundKey;
  currentSelected: FundKey;
  onSelect: (fund: FundKey) => void;
  isConnected: boolean;
  isTransactionProcessing: boolean;
}
// ---------------------

// --- FUND SELECTION COMPONENT (Typed) ---
const FundSelector: React.FC<FundSelectorProps> = ({ 
  fundName, 
  currentSelected, 
  onSelect,
  isConnected,
  isTransactionProcessing
}) => (
  <TouchableOpacity
    style={[
      styles.fundButton,
      currentSelected === fundName && styles.fundButtonSelected
    ]}
    onPress={() => onSelect(fundName)}
    disabled={isTransactionProcessing || !isConnected}
  >
    <Text style={[
      styles.fundButtonText,
      currentSelected === fundName && styles.fundButtonTextSelected
    ]}>
      {fundName.charAt(0).toUpperCase() + fundName.slice(1)} Fund
    </Text>
  </TouchableOpacity>
);

export default function Donation() {
  const { address, isConnected } = useAccount();
  // We explicitly tell useBalance that 'address' might be undefined
  const { data: balanceData } = useBalance({ address });

  // --- NEW STATE FOR USER INPUT ---
  // Fix the TypeScript error by using the defined FundKey type
  const [selectedFund, setSelectedFund] = useState<FundKey>('education');
  const [donationAmount, setDonationAmount] = useState('');
  // --------------------------------

  // --- WAGMI HOOKS FOR TRANSACTION ---
  const { 
    data: hash, 
    isPending, 
    sendTransaction, 
    error: sendError 
  } = useSendTransaction();

  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed, 
    error: confirmError 
  } = useWaitForTransactionReceipt({ hash });
  // -----------------------------------

  // Helper to get the correct address for the selected fund (now type-safe)
  const recipientAddress = FUND_ADDRESSES[selectedFund];
  const isAmountValid = parseFloat(donationAmount) > 0;
  
  // Combine all loading/pending states
  const isTransactionProcessing = isPending || isConfirming;

  const handleDonate = () => {
    if (!isConnected) {
      Alert.alert("Wallet Required", "Please connect your wallet to proceed.");
      return;
    }
    
    const amountFloat = parseFloat(donationAmount);
    if (!amountFloat || amountFloat <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid donation amount.");
      return;
    }

    try {
      // Wagmi transactions require the amount to be in Wei (BigInt)
      const valueInWei = parseEther(donationAmount);

      // Call the sendTransaction function provided by the hook
      sendTransaction({
        to: recipientAddress, // Type is safe: Address
        value: valueInWei,   // Type is safe: bigint (from parseEther)
      });
      
    } catch (e) {
      console.error("Error preparing transaction:", e);
      Alert.alert("Transaction Error", "Could not prepare transaction. Check amount and network.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Make a Donation</Text>
      <Text style={styles.subHeading}>Support Our Smart Village Project</Text>
      
      {/* Wallet Status Section */}
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
            <View style={styles.buttonWrapper}>
              <AppKitButton /> 
            </View>
          </View>
        ) : (
          <View style={styles.disconnectedBox}>
            <Text style={styles.statusText}>Please connect your wallet to donate.</Text>
            <View style={styles.buttonWrapper}>
              <AppKitButton />
            </View>
          </View>
        )}
      </View>
      
      {/* ------------------------------------------- */}
      {/* Fund Selection and Amount Input */}
      {/* ------------------------------------------- */}
      
      {isConnected && (
        <View style={styles.donationControls}>
          <Text style={styles.label}>Choose Fund:</Text>
          <View style={styles.fundSelectorContainer}>
            <FundSelector 
              fundName="education" 
              currentSelected={selectedFund} 
              onSelect={setSelectedFund} 
              isConnected={isConnected}
              isTransactionProcessing={isTransactionProcessing}
            />
            <FundSelector 
              fundName="infrastructure" 
              currentSelected={selectedFund} 
              onSelect={setSelectedFund} 
              isConnected={isConnected}
              isTransactionProcessing={isTransactionProcessing}
            />
          </View>

          <Text style={styles.label}>Amount (ETH):</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDonationAmount}
            value={donationAmount}
            placeholder="0.00 ETH"
            keyboardType="numeric"
            placeholderTextColor="#999"
            editable={!isTransactionProcessing && isConnected}
          />
          
          <Text style={styles.fundRecipient}>
            Sending to: **{selectedFund.charAt(0).toUpperCase() + selectedFund.slice(1)} Fund** ({recipientAddress ? `${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}` : 'N/A'})
          </Text>
        </View>
      )}

      {/* ------------------------------------------- */}
      {/* Donation Button and Status */}
      {/* ------------------------------------------- */}
      
      <TouchableOpacity
        style={[
          styles.donateButton, 
          (!isConnected || isTransactionProcessing || !isAmountValid) && styles.donateButtonDisabled
        ]}
        onPress={handleDonate}
        disabled={!isConnected || isTransactionProcessing || !isAmountValid}
      >
        <Text style={styles.donateButtonText}>
          {isPending ? 'Waiting for Wallet...' : 
           isConfirming ? 'Waiting for Confirmation...' :
           `Donate ${donationAmount || '0'} ETH`}
        </Text>
      </TouchableOpacity>
      
      {/* Transaction Status/Feedback */}
      <View style={styles.statusBox}>
        {hash && (
          <Text style={styles.hashText}>
            Transaction Hash: {hash.slice(0, 8)}...
          </Text>
        )}
        {isConfirmed && <Text style={styles.successText}>✅ Transaction Confirmed!</Text>}
        {sendError && <Text style={styles.errorText}>❌ Send Error: {sendError?.message}</Text>}
        {confirmError && <Text style={styles.errorText}>❌ Confirmation Error: {confirmError?.message}</Text>}
      </View>

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
  },
  
  // NEW STYLES
  donationControls: {
    width: '90%',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  fundSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fundButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  fundButtonSelected: {
    backgroundColor: '#007BFF',
    borderColor: '#0056b3',
    borderWidth: 2,
  },
  fundButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  fundButtonTextSelected: {
    color: 'white',
  },
  input: {
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  fundRecipient: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statusBox: {
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  hashText: {
    fontSize: 12,
    color: '#007BFF',
  },
  successText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 5,
  },
  errorText: {
    color: '#F44336',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  // Existing styles
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