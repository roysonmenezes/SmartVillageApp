import { useEffect, useState } from "react";
import { router } from "expo-router";
import { getToken, getUserRole } from "../utils/storage";
import { ActivityIndicator, View } from "react-native";
import { Text } from "react-native";

export default function Index() {
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    console.log("visiting main index.tsx file checking auth")
    const checkAuth = async () => {
      const token = await getToken();
      const role = await getUserRole(); // admin / villager

      if (token && role) {
        if (role === "admin") {
          router.replace("/admin/home");
        } else if (role === "villager") {
          router.replace("/villager/home");
        } else {
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  if (checkingAuth) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Smart Village App
        </Text>
        <Text style={{ fontSize: 14, color: "gray", marginTop: 5 }}>
          Checking your login status...
        </Text>
      </View>
    </View>
  );
}


  return null;
}
