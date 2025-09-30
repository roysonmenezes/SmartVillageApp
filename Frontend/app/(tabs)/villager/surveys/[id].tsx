// // app/surveys/[id].tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { getToken } from "@/utils/storage";
// import { API_BASE_URL } from "@/utils/api";

// interface Question {
//   id: number;
//   text: string;
//   question_type: string; // "text" | "choice"
//   options?: string;
// }

// interface Survey {
//   id: number;
//   title: string;
//   description: string;
//   questions: Question[];
// }

// const SurveyAnswer = () => {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const [survey, setSurvey] = useState<Survey | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [answers, setAnswers] = useState<Record<number, string>>({});
//   const router = useRouter();

//   const fetchSurvey = async () => {
//     try {
//       const token = await getToken();
//       const res = await fetch(`${API_BASE_URL}/surveys/surveys/${id}/`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         console.error("Failed to fetch survey:", err);
//         Alert.alert("Error", "Failed to fetch survey");
//         return;
//       }

//       const data = await res.json();
//       setSurvey(data);
//     } catch (error: any) {
//       console.error("Error fetching survey:", error.message);
//       Alert.alert("Error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitSurvey = async () => {
//     try {
//       const token = await getToken();
//       const res = await fetch(`${API_BASE_URL}/surveys/responses/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         // body: JSON.stringify({ answers }),
//         body: JSON.stringify({
//     survey: id,   // link response to survey
//     answer: answers, // whatever the villager answered
//   }),
//       });

//       if (!res.ok) {
//         const err = await res.json();
//         console.error("Failed to submit:", err);
//         Alert.alert("Error", "Failed to submit survey");
//         return;
//       }

//       Alert.alert("Success", "Your responses have been submitted!");
//       router.back();
//     } catch (error: any) {
//       console.error("Error submitting survey:", error.message);
//       Alert.alert("Error", error.message);
//     }
//   };

//   useEffect(() => {
//     fetchSurvey();
//   }, []);

//   if (loading)
//     return (
//       <ActivityIndicator
//         size="large"
//         color="#22c55e"
//         style={{ flex: 1, justifyContent: "center" }}
//       />
//     );

//   if (!survey) return <Text className="text-center mt-4">Survey not found</Text>;

//   return (
//     <ScrollView className="flex-1 p-4 bg-white">
//       <Text className="text-xl font-bold text-green-600 mb-2">
//         {survey.title}
//       </Text>
//       <Text className="text-gray-700 mb-4">{survey.description}</Text>

//       {survey.questions.map((q) => (
//         <View
//           key={q.id}
//           className="border border-gray-300 rounded-lg p-3 mb-3"
//         >
//           <Text className="font-medium mb-2">{q.text}</Text>
//           <TextInput
//             className="border border-gray-400 rounded-md p-2"
//             placeholder="Your answer..."
//             value={answers[q.id] || ""}
//             onChangeText={(text) =>
//               setAnswers((prev) => ({ ...prev, [q.id]: text }))
//             }
//           />
//         </View>
//       ))}

//       <TouchableOpacity
//         onPress={submitSurvey}
//         className="bg-green-600 rounded-lg p-3 mt-4 items-center"
//       >
//         <Text className="text-white font-bold">Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default SurveyAnswer;

// app/villager/surveys/[id].tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getToken } from "@/utils/storage";
import { API_BASE_URL } from "@/utils/api";

interface Question {
  id: number;
  text: string;
  question_type: string; // "text" | "choice"
  options?: string;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

const SurveyAnswer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const router = useRouter();

  // Fetch survey details
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

  // Submit survey responses
  const submitSurvey = async () => {
    if (!survey) return;

    // Convert answers state to backend format
    const formattedAnswers = Object.entries(answers).map(([questionId, text]) => ({
      question: parseInt(questionId),
      answer_text: text, // explicitly assign
    }));

    if (formattedAnswers.length === 0) {
      Alert.alert("Error", "Please answer at least one question.");
      return;
    }

    try {
      const token = await getToken();
      const res = await fetch(`${API_BASE_URL}/surveys/responses/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          survey: parseInt(id),
          answers: formattedAnswers,
        }),
      });
      console.log(JSON.stringify({
  survey: parseInt(id),
  answers: formattedAnswers
}));

      if (!res.ok) {
        const err = await res.json();
        console.error("Failed to submit survey:", err);
        Alert.alert("Error", "Failed to submit survey");
        return;
      }

      Alert.alert("Success", "Your responses have been submitted!");
      router.back();
    } catch (error: any) {
      console.error("Error submitting survey:", error.message);
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
      <Text className="text-xl font-bold text-green-600 mb-2">{survey.title}</Text>
      <Text className="text-gray-700 mb-4">{survey.description}</Text>

      {survey.questions.map((q) => (
        <View key={q.id} className="border border-gray-300 rounded-lg p-3 mb-3">
          <Text className="font-medium mb-2">{q.text}</Text>

          {/* {q.question_type === "text" && (
            <TextInput
              className="border border-gray-400 rounded-md p-2"
              placeholder="Your answer..."
              value={answers[q.id] || ""}
              onChangeText={(text) =>
                setAnswers((prev) => ({ ...prev, [q.id]: text }))
              }
            />
          )} */}

          {(q.question_type === "text" || q.question_type === "number") && (
  <TextInput
    className="border border-gray-400 rounded-md p-2"
    placeholder="Your answer..."
    value={answers[q.id] || ""}
    keyboardType={q.question_type === "number" ? "numeric" : "default"}
    onChangeText={(text) =>
      setAnswers((prev) => ({ ...prev, [q.id]: text }))
    }
  />
)}


          {q.question_type === "choice" && q.options && (
            <View className="flex-row flex-wrap">
              {q.options.split(",").map((option) => (
                <TouchableOpacity
                  key={option.trim()}
                  className={`border p-2 rounded mr-2 mb-2 ${
                    answers[q.id] === option.trim()
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onPress={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: option.trim() }))
                  }
                >
                  <Text
                    className={`${
                      answers[q.id] === option.trim() ? "text-white" : "text-black"
                    }`}
                  >
                    {option.trim()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity
        onPress={submitSurvey}
        className="bg-green-600 rounded-lg p-3 mt-4 items-center"
      >
        <Text className="text-white font-bold">Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SurveyAnswer;

