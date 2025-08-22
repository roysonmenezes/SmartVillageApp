
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from "react-native";
import { router } from "expo-router";
import api from "../utils/api";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password || !password2 || !fullName || !phoneNumber || !address || !dateOfBirth) {
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
        user_type: "villager", // ✅ default, not user-selectable
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white px-6 py-6">
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold mb-6">Create an Account</Text>

        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
          keyboardType="phone-pad"
        />

        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
          multiline
        />

        <TextInput
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        />

        <TextInput
          placeholder="Confirm Password"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
        />

        <TouchableOpacity
          onPress={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 py-3 rounded-lg"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-white font-semibold">Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")} className="mt-4">
          <Text className="text-blue-600">Already have an account? Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
