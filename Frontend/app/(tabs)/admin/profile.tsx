import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import api from "@/utils/api";
import { router } from "expo-router";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  user_type: string;
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
      console.error("Error fetching profile:", error.response?.data || error.message);
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
      <Text className="text-2xl font-bold mb-6 text-center">My Profile</Text>

      <View className="mb-4">
        <Text className="font-semibold">Username:</Text>
        <Text>{profile.username}</Text>
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Full Name:</Text>
        <Text>{profile.full_name || "N/A"}</Text>
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Email:</Text>
        <Text>{profile.email}</Text>
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Phone Number:</Text>
        <Text>{profile.phone_number || "N/A"}</Text>
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Address:</Text>
        <Text>{profile.address || "N/A"}</Text>
      </View>

      <View className="mb-4">
        <Text className="font-semibold">Date of Birth:</Text>
        <Text>{profile.date_of_birth || "N/A"}</Text>
      </View>

      <View className="mb-4">
        <Text className="font-semibold">User Type:</Text>
        <Text className="capitalize">{profile.user_type}</Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-600 py-3 mt-6 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
