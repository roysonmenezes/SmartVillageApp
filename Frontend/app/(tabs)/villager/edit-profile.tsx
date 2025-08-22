import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import api from "@/utils/api";
import { router } from "expo-router";

export default function EditProfileScreen() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);

  // ✅ Load existing profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/accounts/profile/");
        setFullName(res.data.full_name || "");
        setPhone(res.data.phone_number || "");
        setEmail(res.data.email || "");
        setAddress(res.data.address || "");
        setDob(res.data.date_of_birth || "");
        setProfilePic(res.data.profile_picture || null);
      } catch (error: any) {
        console.error(error.response?.data || error.message);
      }
    };
    fetchProfile();
  }, []);

  // ✅ Pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // ✅ Update Profile
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("phone_number", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("date_of_birth", dob);

    if (profilePic && !profilePic.startsWith("http")) {
      // only append if it's a new image
      const filename = profilePic.split("/").pop() || "profile.jpg";
      const fileType = filename.split(".").pop();
      formData.append("profile_picture", {
        uri: profilePic,
        name: filename,
        type: `image/${fileType}`,
      } as any);
    }

    try {
      await api.put("/accounts/profile/update/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Ionicons name="create-outline" size={28} color="#5e9146" />
        <Text className="ml-2 text-2xl font-bold" style={{ color: "#5e9146" }}>
          Edit Profile
        </Text>
      </View>

      {/* Profile Picture */}
      <View className="items-center mb-6">
        <TouchableOpacity onPress={pickImage}>
          {profilePic ? (
            <Image
              source={{ uri: profilePic }}
              className="w-40 h-40 rounded-full border-4 border-[#5e9146]"
            />
          ) : (
            <View className="w-40 h-40 rounded-full bg-gray-300 justify-center items-center border-4 border-[#5e9146]">
              <Text className="text-gray-600">Pick Image</Text>
            </View>
          )}
        </TouchableOpacity>
        <Text className="mt-2 text-[#5e9146]">Tap to change picture</Text>
      </View>

      {/* Full Name */}
      <Text className="font-semibold text-lg mb-2">Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter full name"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Phone Number */}
      <Text className="font-semibold text-lg mb-2">Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Email */}
      <Text className="font-semibold text-lg mb-2">Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Address */}
      <Text className="font-semibold text-lg mb-2">Address</Text>
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Enter address"
        multiline
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Date of Birth */}
      <Text className="font-semibold text-lg mb-2">Date of Birth</Text>
      <TextInput
        value={dob}
        onChangeText={setDob}
        placeholder="YYYY-MM-DD"
        className="border border-gray-300 rounded-lg p-3 mb-6"
      />

      {/* Update Button */}
      <TouchableOpacity
        onPress={handleUpdate}
        className="bg-[#5e9146] rounded-lg py-3"
      >
        <Text className="text-white text-center text-lg font-bold">
          Update Profile
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
