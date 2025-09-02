import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "@/utils/api";

interface Grievance {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
}

export default function GrievanceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [grievance, setGrievance] = useState<Grievance | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");

  // Fetch grievance
  const fetchGrievance = async () => {
    try {
      const res = await api.get(`/api/grievances/${id}/`);
      setGrievance(res.data);
      setStatus(res.data.status);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update grievance (only status)
  const handleUpdate = async () => {
    try {
      await api.patch(`/api/grievances/${id}/`, { status });
      Alert.alert("Success", "Grievance updated");
      router.back();
    } catch (error: any) {
      console.error("Error response:", error.response?.data);
      Alert.alert("Error", "Failed to update grievance");
    }
  };

  useEffect(() => {
    fetchGrievance();
  }, []);

  if (loading || !grievance) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#5e9146" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Grievance Info */}
      <View className="bg-white rounded-2xl shadow p-4 mb-4">
        <Text className="text-xl font-bold">{grievance.title}</Text>
        <Text className="text-gray-700 mt-2">{grievance.description}</Text>
        <Text className="text-sm text-gray-500 mt-2">
          Category: {grievance.category}
        </Text>
        <Text className="text-xs text-gray-400">
          Created: {new Date(grievance.created_at).toLocaleString()}
        </Text>
      </View>

      {/* Status Dropdown */}
      <View className="bg-white rounded-2xl shadow p-4 mb-4">
        <Text className="font-semibold mb-2">Status</Text>
        <Picker
          selectedValue={status}
          onValueChange={(val) => setStatus(val)}
          style={{ backgroundColor: "#f0f0f0", borderRadius: 8 }}
        >
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="In Progress" value="in_progress" />
          <Picker.Item label="Resolved" value="resolved" />
        </Picker>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        className="bg-[#5e9146] p-4 rounded-xl shadow-lg mt-4"
        onPress={handleUpdate}
      >
        <Text className="text-white font-bold text-center">Save Changess</Text>
      </TouchableOpacity>
    </View>
  );
}
