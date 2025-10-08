// import { View, Text, StyleSheet } from "react-native";

// export default function AdminHome() {
//   console.log("inside admin home pg")
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>This is Admin Home Page</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5F5F5",
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#333",
//   },
// });

import { View, Text, StyleSheet } from "react-native";
// Import the AppKitButton component
import { AppKitButton } from "@reown/appkit-wagmi-react-native";

export default function AdminHome() {
  console.log("inside admin home pg");
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>This is Admin Home Page</Text>
      
      {/* Add the AppKitButton component here. 
        When pressed, it will open the AppKit modal for wallet connection.
      */}
      <View style={styles.buttonContainer}>
        <AppKitButton 
          label="Connect Wallet" // Customize the button text
          size="md" // 'sm' or 'md'
        />
      </View>
      
      {/* You may also want to add the <AppKit /> component if it's not in your main App file,
          as it handles the modal UI. Often, it's placed at a higher level in the component tree. 
          If you have it in your root App.js, you don't need it here. 
      */}
      {/* <AppKit /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30, // Add some space below the heading
  },
  buttonContainer: {
    // Optional: add styling for positioning the button
    marginTop: 20, 
  }
});