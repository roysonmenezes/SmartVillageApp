// components/blockchain/TransactionTest.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { web3Service } from './services/web3Service';

export const TransactionTest: React.FC = () => {
  const [status, setStatus] = useState('Ready to test');
  const [loading, setLoading] = useState(false);

  const testTransaction = async () => {
    try {
      setLoading(true);
      setStatus('Testing connection...');
      
      await web3Service.initialize();
      setStatus('✅ Connected! Getting balance...');
      
      const balance = await web3Service.getBalance();
      setStatus(`✅ Balance: ${balance} ETH`);
      
      // Don't actually donate, just test the setup
      setStatus('✅ All systems working! Ready for donations.');
      
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction System Test</Text>
      <Text style={styles.status}>{status}</Text>
      <TouchableOpacity 
        onPress={testTransaction} 
        disabled={loading}
        style={[styles.button, loading && styles.disabled]}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Testing...' : 'Test System'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  status: { marginBottom: 20, fontFamily: 'monospace' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
  disabled: { backgroundColor: '#ccc' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' }
});
