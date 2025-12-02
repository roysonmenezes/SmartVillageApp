// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from "react-native";
// import { router } from "expo-router";
// import api from "../utils/api";
// import { useAuthStore } from "../stores/authStore";

// export default function LoginScreen() {
//   const login = useAuthStore((state) => state.login);

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!username || !password) {
//       Alert.alert("Error", "Please enter both username and password");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await api.post("/accounts/login/", { username, password });
//       const { access, refresh, user_type } = res.data;

//       await login(access, refresh, user_type || "user");

//       if (user_type === "admin") {
//         router.replace("/admin/home");
//       } else {
//         router.replace("/villager/home");
//       }
//     } catch (error: any) {
//       Alert.alert("Login failed", "Invalid username or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View className="flex-1 items-center justify-center bg-white px-6">
//       <Image
//         source={{ uri: "https://i.ibb.co/kscRTK8q/enhanced-logo.jpg" }}
//         style={{ width: 330, height: 330, marginBottom: 0 }}
//       />

//       <Text className="text-4xl font-bold mb-6" style={{ color: "#5e9146" }}>
//         Smart Village
//       </Text>

//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         className="w-full rounded-lg px-4 py-3 mb-4"
//         style={{ borderWidth: 1, borderColor: "#5e9146" }}
//         autoCapitalize="none"
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         className="w-full rounded-lg px-4 py-3 mb-6"
//         style={{ borderWidth: 1, borderColor: "#5e9146" }}
//       />

//       <TouchableOpacity
//         onPress={handleLogin}
//         disabled={loading}
//         className="w-full py-3 rounded-lg"
//         style={{ backgroundColor: "#5e9146" }}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text className="text-center text-white font-semibold">Login</Text>
//         )}
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => router.push("/signup")} className="mt-4">
//         <Text style={{ color: "#5e9146", fontWeight: "600" }}>
//           Don't have an account? Register
//         </Text>
//       </TouchableOpacity>
//     </View>
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
  Image,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet
} from "react-native";
import { router } from "expo-router";
import api from "../utils/api";
import { useAuthStore } from "../stores/authStore";

export default function LoginScreen() {
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

      await login(access, refresh, user_type || "user");

      if (user_type === "admin") {
        router.replace("/admin/home");
      } else {
        router.replace("/villager/home");
      }
    } catch (error: any) {
      Alert.alert("Login failed", "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 5}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.pageWrapper} onPress={() => Keyboard.dismiss()}>
          
          <Image
            source={{ uri: "https://i.ibb.co/kscRTK8q/enhanced-logo.jpg" }}
            style={{ width: 330, height: 330, marginBottom: 0 }}
          />

          <Text style={styles.title}>Smart Village</Text>

          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, { marginBottom: 20 }]}
            returnKeyType="done"
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={[styles.button, loading && { opacity: 0.7 }]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/signup")} style={{ marginTop: 12 }}>
            <Text style={styles.linkText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>

        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const THEME = "#5e9146";

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 20,
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
  button: {
    width: "100%",
    backgroundColor: THEME,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
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
