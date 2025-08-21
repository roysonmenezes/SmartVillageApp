import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import api from "../utils/api";
import { useAuthStore } from "../stores/authStore";

export default function LoginScreen() {
  console.log("inside login screen");
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/accounts/login/", { username, password });

      const { access, refresh, user_type } = res.data;
      await login(access, refresh, user_type || "user"); // role defaults to "user" if not sent
      console.log("role", user_type);

      // Redirect user after login
      if (user_type === "admin") {
        router.replace("/admin/home"); // Example admin tab
      } else {
        router.replace("/villager/home"); // Example user tab
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert("Login failed", "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };
console.log("Login component rendered");
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6" style={{ color: "white" }}>Smart Village Login</Text>


      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 py-3 rounded-lg"
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center text-white font-semibold">Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/signup")}
        className="mt-4"
      >
        <Text className="text-blue-600">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
