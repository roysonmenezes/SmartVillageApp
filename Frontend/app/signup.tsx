// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Pressable, Platform } from "react-native";
// import { router } from "expo-router";
// import api from "../utils/api";
// import DateTimePicker from "@react-native-community/datetimepicker";


// export default function SignupScreen() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [showPicker, setShowPicker] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleDateChange = (event: any, selectedDate: Date | undefined) => {
//     setShowPicker(false);
//     if (selectedDate) {
//       const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
//       setDateOfBirth(formatted);
//     }
//   };

//   const handleSignup = async () => {
//     if (!username || !email || !password || !password2 || !fullName || !phoneNumber || !address || !dateOfBirth) {
//       Alert.alert("Error", "All fields are required");
//       return;
//     }

//     if (password !== password2) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.post("/accounts/register/", {
//         username,
//         email,
//         password,
//         password2,
//         full_name: fullName,
//         phone_number: phoneNumber,
//         address,
//         date_of_birth: dateOfBirth,
//         user_type: "villager",
//       });

//       Alert.alert("Success", "Account created. Please log in.");
//       router.replace("/login");
//     } catch (error: any) {
//       Alert.alert("Signup failed", error.response?.data?.message || "Try again later");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white px-6 py-6">
//       <View className="flex-1 items-center justify-center">
//         <Text className="text-3xl font-bold mb-6" style={{ color: "#5e9146" }}>
//           Create an Account
//         </Text>

//         {/* Inputs with theme border */}
//         {[
//           { placeholder: "Full Name", value: fullName, setter: setFullName },
//           { placeholder: "Username", value: username, setter: setUsername, autoCapitalize: "none" as const },
//           { placeholder: "Email", value: email, setter: setEmail, autoCapitalize: "none" as const, keyboardType: "email-address" as const },
//           { placeholder: "Phone Number", value: phoneNumber, setter: setPhoneNumber, keyboardType: "phone-pad" as const },
//           { placeholder: "Address", value: address, setter: setAddress, multiline: true },
//         ].map((field, index) => (
//           <TextInput
//             key={index}
//             placeholder={field.placeholder}
//             value={field.value}
//             onChangeText={field.setter}
//             className="w-full rounded-lg px-4 py-3 mb-4"
//             style={{ borderWidth: 1, borderColor: "#5e9146" }}
//             autoCapitalize={field.autoCapitalize ?? "sentences"}
//             keyboardType={field.keyboardType}
//             multiline={field.multiline}
//           />
//         ))}

//         {/* 📌 Date of Birth with calendar */}
//         <Pressable
//           onPress={() => setShowPicker(true)}
//           className="w-full rounded-lg px-4 py-3 mb-4"
//           style={{ borderWidth: 1, borderColor: "#5e9146", backgroundColor: "white" }}
//         >
//           <Text style={{ color: dateOfBirth ? "#000" : "gray" }}>
//             {dateOfBirth || "Select Date of Birth"}
//           </Text>
//         </Pressable>

//         {showPicker && (
//           <DateTimePicker
//             value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
//             mode="date"
//             onChange={handleDateChange}
//             maximumDate={new Date()}
//             display={Platform.OS === "ios" ? "spinner" : "default"}
//           />
//         )}

//         {/* Password fields */}
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           className="w-full rounded-lg px-4 py-3 mb-4"
//           style={{ borderWidth: 1, borderColor: "#5e9146" }}
//         />

//         <TextInput
//           placeholder="Confirm Password"
//           value={password2}
//           onChangeText={setPassword2}
//           secureTextEntry
//           className="w-full rounded-lg px-4 py-3 mb-6"
//           style={{ borderWidth: 1, borderColor: "#5e9146" }}
//         />

//         {/* Signup button */}
//         <TouchableOpacity
//           onPress={handleSignup}
//           disabled={loading}
//           className="w-full py-3 rounded-lg"
//           style={{ backgroundColor: "#5e9146" }}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text className="text-center text-white font-semibold">Sign Up</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push("/login")} className="mt-4">
//           <Text style={{ color: "#5e9146", fontWeight: "600" }}>
//             Already have an account? Log in
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import api from "../utils/api";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    // On Android the event fires twice; selectedDate may be undefined when dismissed
    setShowPicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setDateOfBirth(formatted);
    }
  };

  const handleSignup = async () => {
    if (
      !username ||
      !email ||
      !password ||
      !password2 ||
      !fullName ||
      !phoneNumber ||
      !address ||
      !dateOfBirth
    ) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== password2) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/accounts/register/", {
        username,
        email,
        password,
        password2,
        full_name: fullName,
        phone_number: phoneNumber,
        address,
        date_of_birth: dateOfBirth,
        user_type: "villager",
      });

      Alert.alert("Success", "Account created. Please log in.");
      router.replace("/login");
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert("Signup failed", error.response?.data?.message || "Try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // adjust vertical offset if you have a header/navigation bar
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.pageWrapper} onPress={() => Keyboard.dismiss()}>
          <Text style={styles.title}>Create an Account</Text>

          {/* ---------- Inputs ---------- */}
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={[styles.input]}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={[styles.input]}
            autoCapitalize={"none"}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={[styles.input]}
            autoCapitalize={"none"}
            keyboardType={"email-address"}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={[styles.input]}
            keyboardType={"phone-pad"}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={[styles.input, { height: 90, textAlignVertical: "top" }]}
            multiline
            returnKeyType="next"
          />

          {/* Date of Birth - Press to open native picker */}
          <Pressable
            onPress={() => setShowPicker(true)}
            style={[styles.input, styles.dateInput]}
          >
            <Text style={{ color: dateOfBirth ? "#000" : "#8a8a8a" }}>
              {dateOfBirth || "Select Date of Birth"}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
              mode="date"
              onChange={handleDateChange}
              maximumDate={new Date()}
              display={Platform.OS === "ios" ? "spinner" : "default"}
            />
          )}

          {/* Password fields */}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input]}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Confirm Password"
            value={password2}
            onChangeText={setPassword2}
            secureTextEntry
            style={[styles.input, { marginBottom: 20 }]}
            returnKeyType="done"
          />

          {/* Signup button */}
          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            style={[styles.button, loading && styles.buttonDisabled]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/login")} style={{ marginTop: 12 }}>
            <Text style={styles.linkText}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const THEME = "#5e9146";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  pageWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 18,
    color: THEME,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: THEME,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dateInput: {
    justifyContent: "center",
  },
  button: {
    width: "100%",
    backgroundColor: THEME,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  linkText: {
    color: THEME,
    fontWeight: "600",
  },
});
