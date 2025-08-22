import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useAuthStore } from "@/stores/authStore";
import api from "@/utils/api";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  user_type: string;
  profile_picture: string | null;
}

export default function ProfileScreen() {
  const logout = useAuthStore((state) => state.logout);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/accounts/profile/");
      setProfile(res.data);
    } catch (error: any) {
      console.error(
        "Error fetching profile:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Failed to fetch profile details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No profile data found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* <Text
  className="text-3xl font-bold mb-6 text-center mt-6"
  style={{ color: "#5e9146" }} // custom hex code
>
  My Profile
</Text> */}
    <View className="flex-row justify-between items-center mt-6 mb-6">
        <Text
          className="text-3xl font-bold text-center flex-1"
          style={{ color: "#5e9146" }}
        >
          My Profile
        </Text>

        {/* Edit Button */}
        <TouchableOpacity  onPress={() => router.push("/(tabs)/admin/edit-profile")}>
          <Ionicons name="create-outline" size={28} color="#5e9146" />
        </TouchableOpacity>
      </View>

      {profile.profile_picture ? (
        <View className="items-center mb-6">
          <Image
            source={{ uri: profile.profile_picture }}
            className="w-40 h-40 rounded-full border-4 border-[#5e9146]"
          />
        </View>
      ) : (
        <View className="items-center mb-6">
          <View className="w-40 h-40 rounded-full bg-gray-300 justify-center items-center border-4 border-[#5e9146]">
            <Text className="text-gray-600 text-lg">No Photo</Text>
          </View>
        </View>
      )}

      {/* Profile Details Side by Side with Bigger Text */}
      <View className="space-y-4">
  <View className="flex-row items-start">
    <Text className="font-semibold text-lg w-36">Username:</Text>
    <Text className="text-lg flex-1">{profile.username}</Text>
  </View>

  <View className="flex-row items-start">
    <Text className="font-semibold text-lg w-36">Full Name:</Text>
    <Text className="text-lg flex-1">{profile.full_name || "N/A"}</Text>
  </View>

  <View className="flex-row items-start">
    <Text className="font-semibold text-lg w-36">Email:</Text>
    <Text className="text-lg flex-1">{profile.email}</Text>
  </View>

  <View className="flex-row items-start">
    <Text className="font-semibold text-lg w-36">Phone Number:</Text>
    <Text className="text-lg flex-1">{profile.phone_number || "N/A"}</Text>
  </View>

  <View className="flex-row items-start">
    <Text className="font-semibold text-lg w-36">Address:</Text>
    <Text className="text-lg flex-1">{profile.address || "N/A"}</Text>
  </View>

  <View className="flex-row items-start">
    <Text className="font-semibold text-lg w-36">Date of Birth:</Text>
    <Text className="text-lg flex-1">{profile.date_of_birth || "N/A"}</Text>
  </View>

  <View className="flex-row items-start">
    <Text className="font-semibold text-lg w-36">User Type:</Text>
    <Text className="text-lg flex-1 capitalize">{profile.user_type}</Text>
  </View>
</View>


      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center mt-8"
      >
        <Ionicons name="log-out-outline" size={28} color="#ef4444" />
        <Text
          style={{ color: "#ef4444", fontSize: 22, fontWeight: "600" }}
          className="ml-2"
        >
          Log out
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

