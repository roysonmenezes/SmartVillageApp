// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import axios from 'axios';

// export default function BackendDataScreen() {
//   const [message, setMessage] = useState('');

//   console.log('BackendDataScreen rendered');
//   console.log('BackendDataScreen message:', message);
//   useEffect(() => {
//     // Replace with your Django backend URL
//     const fetchMessage = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/hello/');
//         setMessage(response.data.message);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchMessage();
//   }, []);

//   return (
//     <View style={styles.container}>
//         <Text >some backend text shoul come here
//         </Text>
//       <Text style={styles.text}>{message || 'Loading...'}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BackendDataScreen() {
  const [message, setMessage] = useState('');

  console.log('BackendDataScreen rendered');
  console.log('BackendDataScreen message:', message);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/hello/');
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Backend Data Screen</Text>
      <Text style={styles.description}>Fetching data from Django backend...</Text>

      <View style={styles.box}>
        <Text style={styles.text}>{message || 'Loading...'}</Text>
      </View>
      <Text style={styles.info}>{message || 'Loading...'}</Text>
      <Text style={styles.info}>Check console for logs.</Text>
      <Text style={styles.warning}>Ensure the backend is running on port 8000.</Text>
      <Text style={styles.success}>If you see this, your app is running correctly.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Dark background
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700', // Gold
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF', // White
    marginBottom: 20,
  },
  box: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: '#00FFFF', // Cyan
  },
  info: {
    fontSize: 16,
    color: '#ADD8E6', // Light Blue
    marginTop: 10,
  },
  warning: {
    fontSize: 16,
    color: '#FFA500', // Orange
    fontWeight: 'bold',
    marginTop: 10,
  },
  success: {
    fontSize: 16,
    color: '#32CD32', // Lime Green
    fontWeight: 'bold',
    marginTop: 10,
  },
});
