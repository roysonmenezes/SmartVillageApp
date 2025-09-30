import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons"; // ✅ for delete icon
import { getToken } from "@/utils/storage";
import { API_BASE_URL } from "@/utils/api";

interface Question {
  text: string;
  question_type: string;
  options?: string; // Only needed when question_type is "choice"
}

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { text: "", question_type: "text", options: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", question_type: "text", options: "" }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Validation Error", "Survey title is required.");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch(`${API_BASE_URL}/surveys/surveys/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            description,
            questions: questions.map((q) => ({
              text: q.text,
              question_type: q.question_type,
              options: q.question_type === "choice" ? q.options : "",
            })),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Survey creation failed:", err);
        Alert.alert("Error", JSON.stringify(err));
        return;
      }

      const data = await response.json();
      console.log("Survey created:", data);
      Alert.alert("Success", "Survey created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setQuestions([{ text: "", question_type: "text", options: "" }]);
    } catch (error: any) {
      console.error("Error creating survey:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4 text-green-600">
        Create Survey
      </Text>

      {/* Title */}
      <TextInput
        placeholder="Survey Title"
        value={title}
        onChangeText={setTitle}
        className="border border-gray-300 rounded-lg p-3 mb-3"
      />

      {/* Description */}
      <TextInput
        placeholder="Survey Description"
        value={description}
        onChangeText={setDescription}
        multiline
        className="border border-gray-300 rounded-lg p-3 mb-3"
      />

      {/* Questions */}
      <Text className="text-lg font-semibold mb-2">Questions</Text>
      {questions.map((q, i) => (
        <View key={i} className="mb-3 border border-gray-200 rounded-lg p-3">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-semibold">Question {i + 1}</Text>

            {/* Delete button */}
            {questions.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveQuestion(i)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </TouchableOpacity>
            )}
          </View>

          {/* Question text */}
          <TextInput
            placeholder="Enter question"
            value={q.text}
            onChangeText={(text) => handleQuestionChange(i, "text", text)}
            className="border border-gray-300 rounded-lg p-3 mb-2"
          />

          {/* Dropdown for type */}
          <View className="border border-gray-300 rounded-lg mb-2">
            <Picker
              selectedValue={q.question_type}
              onValueChange={(value) =>
                handleQuestionChange(i, "question_type", value)
              }
            >
              <Picker.Item label="Text" value="text" />
              <Picker.Item label="Number" value="number" />
              <Picker.Item label="Choice" value="choice" />
            </Picker>
          </View>

          {/* Extra input if type = choice */}
          {q.question_type === "choice" && (
            <TextInput
              placeholder="Enter options (comma separated: Yes,No,Maybe)"
              value={q.options}
              onChangeText={(val) => handleQuestionChange(i, "options", val)}
              className="border border-gray-300 rounded-lg p-3"
            />
          )}
        </View>
      ))}

      <TouchableOpacity
        onPress={handleAddQuestion}
        className="bg-gray-200 rounded-lg p-3 mb-3 items-center"
      >
        <Text className="text-gray-700 font-medium">+ Add Question</Text>
      </TouchableOpacity>

      {/* Submit */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-green-600 rounded-lg p-3 items-center"
      >
        <Text className="text-white font-bold">
          {loading ? "Creating..." : "Create Survey"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateSurvey;
