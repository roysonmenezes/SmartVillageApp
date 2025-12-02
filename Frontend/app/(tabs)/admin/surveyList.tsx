
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
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

  if (loading) return <ActivityIndicator size="large" color="#22c55e" style={{ flex: 1, justifyContent: "center" }} />;

  // return (
  //   <ScrollView className="flex-1 p-4 bg-white">
  //     {/* Header with Title + Create Button */}
  //     <View className="flex-row justify-between items-center mb-4 mt-9">
  //       <Text className="text-xl font-bold text-green-600">All Surveys</Text>
  //       <TouchableOpacity
  //         className="bg-green-600 px-4 py-2 rounded"
  //         onPress={() => router.push("/admin/createSurvey")}
  //       >
  //         <Text className="text-white font-semibold">Create Survey</Text>
  //       </TouchableOpacity>
  //     </View>

  //     {/* Survey List */}
  //     {surveys.map((survey) => (
  //       <TouchableOpacity
  //         key={survey.id}
  //         onPress={() =>
  //           router.push({
  //             pathname: "/admin/surveyDetail/[id]",
  //             params: { id: survey.id.toString() },
  //           })
  //         }
  //         className="border border-gray-300 rounded-lg p-4 mb-3"
  //       >
  //         <Text className="font-semibold text-lg">{survey.title}</Text>
  //         <Text className="text-gray-600 mt-1">{survey.description}</Text>
  //       </TouchableOpacity>
  //     ))}
  //   </ScrollView>
  // );

  return (
  <View className="flex-1 bg-gray-100">
    {/* Page Title */}
    <Text className="text-2xl font-bold text-center text-[#5e9146] mt-10 mb-3">
      All Surveys
    </Text>

    {/* List of surveys inside scrollview */}
    <ScrollView className="flex-1 px-4 mb-20">
      {surveys.length > 0 ? (
        surveys.map((survey) => (
          <TouchableOpacity
            key={survey.id}
            onPress={() =>
              router.push({
                pathname: "/admin/surveyDetail/[id]",
                params: { id: survey.id.toString() },
              })
            }
            className="bg-white rounded-xl p-4 mb-1 shadow-sm border border-gray-200"
          >
            <Text className="text-lg font-bold text-gray-800">{survey.title}</Text>
            <Text className="text-gray-600 mt-1">{survey.description}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-center text-gray-500 mt-10 text-lg">
          No surveys available
        </Text>
      )}
    </ScrollView>

    {/* Create Survey Floating Button */}
    <TouchableOpacity
  onPress={() => router.push("/admin/createSurvey")}
  className="absolute bottom-6 right-6 bg-[#5e9146] px-5 py-3 rounded-xl items-center justify-center shadow-lg flex-row"
  style={{ elevation: 5 }}
>
  <Text className="text-white text-lg font-semibold">+ Create</Text>
</TouchableOpacity>

  </View>
);

};

export default SurveyList;
