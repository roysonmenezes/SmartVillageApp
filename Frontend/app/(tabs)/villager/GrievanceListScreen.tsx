import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/utils/api";

interface Grievance {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
}

export default function GrievanceListScreen() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  const fetchGrievances = async () => {
    try {
      const res = await api.get("/api/grievances/");
      setGrievances(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#5e9146" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* List of grievances */}
      <FlatList
        data={grievances}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchGrievances} />
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl shadow p-4 m-2">
            <Text className="text-lg font-bold">{item.title}</Text>
            <Text className="text-gray-700">{item.description}</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Category: {item.category} | Status: {item.status}
            </Text>
            <Text className="text-xs text-gray-400">
              Created: {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
      />

      {/* Floating button */}
      <TouchableOpacity
        className="bg-[#5e9146] p-4 rounded-full absolute bottom-6 right-6 shadow-lg"
        onPress={() => router.push("/(tabs)/villager/SubmitGrievanceScreen")} // 👈 navigate to form page
      >
        <Text className="text-white font-bold">+ New Complaint</Text>
      </TouchableOpacity>
    </View>
  );
}
