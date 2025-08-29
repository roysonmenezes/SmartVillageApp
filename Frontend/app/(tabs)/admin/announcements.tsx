import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
// import api from "../../utils/api"; // <-- your axios instance with baseURL + token handling
import api from "@/utils/api";
import { router } from "expo-router";
import { getToken } from "@/utils/storage"; // wherever you save token


export default function AdminCreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [expiresAt, setExpiresAt] = useState(""); // ISO datetime string
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title || !message || !expiresAt) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();
      const response = await api.post("api/announcements/create/", {
        title,
        message,
        expires_at: expiresAt,
      },
     {
        headers: {
          Authorization: `Bearer ${token}`, // or `Token ${token}` if you use DRF TokenAuth
        },
      });

      Alert.alert("Success", "Announcement created successfully!");
      console.log("Created:", response.data);

      // Optionally navigate back to dashboard or announcements list
      router.push("/admin/announcements");
    } catch (error: any) {
      console.error("Error creating announcement:", error);
      Alert.alert("Error", "Failed to create announcement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-4">Create Announcement</Text>

      <Text className="text-lg font-semibold mb-2">Title</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Enter announcement title"
        value={title}
        onChangeText={setTitle}
      />

      <Text className="text-lg font-semibold mb-2">Message</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Enter announcement message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      <Text className="text-lg font-semibold mb-2">Expires At</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="YYYY-MM-DDTHH:MM:SSZ"
        value={expiresAt}
        onChangeText={setExpiresAt}
      />

      <TouchableOpacity
        onPress={handleCreate}
        className="bg-blue-600 p-4 rounded-xl items-center"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold">Create</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
