
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getToken } from "@/utils/storage";
import { API_BASE_URL } from "@/utils/api";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

interface Question {
  id: number;
  text: string;
  question_type: string;
  options?: string;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  response_count: number;
}

const SurveyDetail = () => {
  console.log("Rendering SurveyDetail component");
  const { id } = useLocalSearchParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSurvey = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE_URL}/surveys/surveys/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Failed to fetch survey:", err);
        Alert.alert("Error", "Failed to fetch survey");
        return;
      }

      const data = await res.json();
      setSurvey(data);
    } catch (error: any) {
      console.error("Error fetching survey:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

// 🔹 Download Excel
  const handleDownloadExcel = async () => {
    try {
      const token = await getToken();
      const url = `${API_BASE_URL}/surveys/${id}/export/`;
      const fileUri = FileSystem.documentDirectory + `survey_${id}_responses.xlsx`;

      const res = await FileSystem.downloadAsync(url, fileUri, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("File downloaded to:", res.uri);

      if (Platform.OS === "ios" || Platform.OS === "android") {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(res.uri);
        } else {
          Alert.alert(
            "Download Complete",
            `File saved at: ${res.uri}. Please open it with Excel or a file viewer.`
          );
        }
      } else {
        // ✅ Web fallback
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const blob = await response.blob();
        const fileUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = `survey_${id}_responses.xlsx`;
        a.click();
        window.URL.revokeObjectURL(fileUrl);
      }
    } catch (error: any) {
      console.error("Error downloading Excel:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    fetchSurvey();
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#22c55e"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );

  if (!survey) return <Text className="text-center mt-4">Survey not found</Text>;

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-2 text-green-600">
        {survey.title}
      </Text>
      <Text className="text-gray-700 mb-4">{survey.description}</Text>

      <Text className="text-gray-800 font-medium mb-4">
        Responses: {survey.response_count}
      </Text>

      <Text className="text-lg font-semibold mb-2">Questions:</Text>
      {survey.questions.map((q) => (
        <View
          key={q.id}
          className="border border-gray-300 rounded-lg p-3 mb-2"
        >
          <Text className="font-medium">{q.text}</Text>
          <Text className="text-gray-500 text-sm">
            Type: {q.question_type}
          </Text>
          {q.question_type === "choice" && (
            <Text className="text-gray-500 text-sm">Options: {q.options}</Text>
          )}
        </View>
      ))}

      <TouchableOpacity
        onPress={handleDownloadExcel}
        className="bg-green-600 rounded-lg p-3 mt-4 items-center"
      >
        <Text className="text-white font-bold">
          Download Responses (Excel)
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SurveyDetail;
