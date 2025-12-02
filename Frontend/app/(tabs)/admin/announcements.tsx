
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import api from "@/utils/api";
import { router } from "expo-router";
import { getToken } from "@/utils/storage";

export default function AdminCreateAnnouncement() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleConfirm = (date: Date) => {
    setExpiresAt(date);
    setShowPicker(false);
  };

  const handleCreate = async () => {
    if (!title || !message || !expiresAt) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const response = await api.post(
        "api/announcements/create/",
        {
          title,
          message,
          expires_at: expiresAt.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Success", "Announcement created successfully!");
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
      <Text className="text-2xl font-bold mb-4 mt-10 text-center  text-[#5e9146]">Create Announcement</Text>

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
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        className="border border-gray-300 rounded-lg p-3 mb-4"
      >
        <Text className="text-gray-700">
          {expiresAt
            ? expiresAt.toLocaleString()
            : "Select date and time"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        date={expiresAt || new Date()}
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
      />

      <TouchableOpacity
        onPress={handleCreate}
        className="bg-[#5e9146] p-4 rounded-xl items-center"
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
