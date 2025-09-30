// app/surveys/index.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "@/utils/storage";
import { API_BASE_URL } from "@/utils/api";

interface Survey {
  id: number;
  title: string;
  description: string;
}

const SurveyList = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSurveys = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE_URL}/surveys/surveys/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Failed to fetch surveys:", err);
        Alert.alert("Error", "Failed to fetch surveys");
        return;
      }

      const data = await res.json();
      setSurveys(data);
    } catch (error: any) {
      console.error("Error fetching surveys:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#22c55e"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold text-green-600 mb-4">Surveys</Text>
      {surveys.map((s) => (
        <TouchableOpacity
          key={s.id}
          className="p-4 bg-gray-100 rounded-lg mb-3"
        //   onPress={() => router.push(`/(tabs)/villager/surveys/[id]`, { id: s.id.toString() })}
        onPress={() =>
  router.push({
    pathname: "/(tabs)/villager/surveys/[id]",
    params: { id: String(s.id) },
  })
}
        >
          <Text className="text-lg font-semibold">{s.title}</Text>
          <Text className="text-gray-600">{s.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SurveyList;
