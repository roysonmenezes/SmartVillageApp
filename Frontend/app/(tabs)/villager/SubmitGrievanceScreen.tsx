import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "@/utils/api";

import { Picker } from "@react-native-picker/picker";


export default function SubmitGrievanceScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    if (!title || !description || !category) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await api.post("/api/grievances/", {
        title,
        description,
        category,
      });

      Alert.alert("Success", "Your grievance has been submitted", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);

      // reset form
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (error: any) {
      console.error("Submit grievance error:", error?.response?.data || error.message);
      Alert.alert("Error", "Failed to submit grievance");
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white rounded-2xl shadow p-6">
        <Text className="text-xl font-bold mb-6 text-[#5e9146]">Submit New Complaint</Text>

        {/* Title Input */}
        <Text className="font-semibold mb-1">Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter complaint title"
          className="border border-gray-300 rounded-lg p-3 mb-4"
        />

        {/* Description Input */}
        <Text className="font-semibold mb-1">Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter detailed description"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          className="border border-gray-300 rounded-lg p-3 mb-4 h-28"
        />

        {/* Category Input */}
        <Text className="font-semibold mb-1">Category</Text>
<View className="border border-gray-300 rounded-lg mb-6">
  <Picker
    selectedValue={category}
    onValueChange={(itemValue) => setCategory(itemValue)}
  >
    <Picker.Item label="Select a category" value="other" />
    <Picker.Item label="Water Supply" value="water" />
    <Picker.Item label="Electricity" value="electricity" />
    <Picker.Item label="Roads" value="roads" />
    <Picker.Item label="Health" value="health" />
    <Picker.Item label="Other" value="other" />
  </Picker>
</View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#5e9146] p-4 rounded-xl items-center"
        >
          <Text className="text-white font-bold text-lg">Submit Complaint</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
