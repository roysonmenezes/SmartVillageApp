// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator
// } from 'react-native';
// import { useDonation } from '../../../blockchain/hooks/useDonation';
// import { DonationCard } from '../../../components/blockchain/DonationCard';

// export default function DonationScreen() {
//   const { funds, balance, loading, error, donate, walletAddress } = useDonation();
//   const [selectedFund, setSelectedFund] = useState(0);
//   const [amount, setAmount] = useState('');
//   const [donating, setDonating] = useState(false);

//   const handleDonate = async () => {
//     if (!amount || parseFloat(amount) <= 0) {
//       Alert.alert('Error', 'Please enter a valid amount');
//       return;
//     }

//     try {
//       setDonating(true);
//       const tx = await donate(selectedFund, amount);
//       Alert.alert('Success!', `Donation sent! TX: ${tx.hash.slice(0, 10)}...`);
//       setAmount('');
//     } catch (error) {
//       Alert.alert('Error', 'Donation failed');
//     } finally {
//       setDonating(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#3b82f6" />
//         <Text>Loading blockchain data...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>🏘️ Village Donations</Text>
      
//       <View style={styles.walletInfo}>
//         <Text style={styles.walletLabel}>Wallet: {walletAddress.slice(0, 8)}...</Text>
//         <Text style={styles.balance}>Balance: {balance} ETH</Text>
//       </View>

//       <Text style={styles.section}>Select Fund:</Text>
//       {funds.map((fund) => (
//         <DonationCard
//           key={fund.id}
//           fund={fund}
//           isSelected={selectedFund === fund.id}
//           onSelect={() => setSelectedFund(fund.id)}
//         />
//       ))}

//       <Text style={styles.section}>Donation Amount:</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={amount}
//           onChangeText={setAmount}
//           placeholder="0.01"
//           keyboardType="decimal-pad"
//         />
//         <Text style={styles.currency}>ETH</Text>
//       </View>

//       <TouchableOpacity
//         style={[styles.button, donating && styles.disabled]}
//         onPress={handleDonate}
//         disabled={donating}
//       >
//         <Text style={styles.buttonText}>
//           {donating ? 'Processing...' : 'Donate Now'}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f9fafb',
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   walletInfo: {
//     backgroundColor: '#dbeafe',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   walletLabel: {
//     fontSize: 14,
//     color: '#1e40af',
//   },
//   balance: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#1e40af',
//   },
//   section: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     padding: 16,
//     fontSize: 16,
//   },
//   currency: {
//     padding: 16,
//     fontWeight: 'bold',
//     color: '#6b7280',
//   },
//   button: {
//     backgroundColor: '#10b981',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   disabled: {
//     backgroundColor: '#9ca3af',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


// app/(tabs)/villager/donation.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useDonation } from '../../../blockchain/hooks/useDonation';
import { DonationCard } from '../../../components/blockchain/DonationCard';
import { TransactionTest } from '@/blockchain/TransactionTest';

export default function DonationScreen() {
  const { funds, balance, loading, error, donate, walletAddress } = useDonation();
  const [selectedFund, setSelectedFund] = useState(0);
  const [amount, setAmount] = useState('');
  const [donating, setDonating] = useState(false);
  const [showTest, setShowTest] = useState(false); // ✅ NEW STATE

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    try {
      setDonating(true);
      const tx = await donate(selectedFund, amount);
      Alert.alert('Success!', `Donation sent! TX: ${tx.hash.slice(0, 10)}...`);
      setAmount('');
    } catch (error) {
      Alert.alert('Error', 'Donation failed');
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text>Loading blockchain data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏘️ Village Donations</Text>
      
      {/* ✅ NEW: Test System Toggle */}
      <TouchableOpacity
        style={styles.testToggle}
        onPress={() => setShowTest(!showTest)}
      >
        <Text style={styles.testToggleText}>
          🔧 {showTest ? 'Hide' : 'Show'} System Test
        </Text>
      </TouchableOpacity>

      {/* ✅ NEW: Show test component when toggled */}
      {showTest && (
        <View style={styles.testContainer}>
          <TransactionTest />
        </View>
      )}
      
      <View style={styles.walletInfo}>
        <Text style={styles.walletLabel}>Wallet: {walletAddress.slice(0, 8)}...</Text>
        <Text style={styles.balance}>Balance: {balance} ETH</Text>
      </View>

      <Text style={styles.section}>Select Fund:</Text>
      {funds.map((fund) => (
        <DonationCard
          key={fund.id}
          fund={fund}
          isSelected={selectedFund === fund.id}
          onSelect={() => setSelectedFund(fund.id)}
        />
      ))}

      <Text style={styles.section}>Donation Amount:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.01"
          keyboardType="decimal-pad"
        />
        <Text style={styles.currency}>ETH</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, donating && styles.disabled]}
        onPress={handleDonate}
        disabled={donating}
      >
        <Text style={styles.buttonText}>
          {donating ? 'Processing...' : 'Donate Now'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  // ✅ NEW: Test toggle button styles
  testToggle: {
    backgroundColor: '#fef3c7',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  testToggleText: {
    textAlign: 'center',
    color: '#92400e',
    fontWeight: '600',
  },
  testContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  walletInfo: {
    backgroundColor: '#dbeafe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  walletLabel: {
    fontSize: 14,
    color: '#1e40af',
  },
  balance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  currency: {
    padding: 16,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
