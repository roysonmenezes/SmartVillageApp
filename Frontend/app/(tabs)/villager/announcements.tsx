import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import api from "@/utils/api";
interface Announcement {
  id: number;
  title: string;
  message: string;
  created_at: string;
  expires_at: string;
}

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await api.get("/api/announcements/");
        setAnnouncements(response.data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setError("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-600">Loading announcements...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">Announcements</Text>

      {announcements.length === 0 ? (
        <Text className="text-center text-gray-500">No announcements yet.</Text>
      ) : (
        announcements.map((item) => (
          <View
            key={item.id}
            className="mb-4 p-4 bg-gray-100 rounded-2xl shadow"
          >
            <Text className="text-lg font-semibold">{item.title}</Text>
            <Text className="text-base text-gray-700 mt-1">{item.message}</Text>
            <Text className="text-xs text-gray-500 mt-2">
              Posted: {new Date(item.created_at).toLocaleString()}
            </Text>
            <Text className="text-xs text-gray-500">
              Expires: {new Date(item.expires_at).toLocaleString()}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
