import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getToken } from "@/utils/storage";
import { API_BASE_URL } from "@/utils/api";

// 🔹 Helper: Convert base64 data URI -> Blob (for web)
function dataURItoBlob(dataURI: string) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const PostAdvertisement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // ✅ Submit handler
  const handleSubmit = async () => {
    if (!title || !description || !redirectUrl || !image) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("redirect_url", redirectUrl);
      formData.append("expiry_date", expiryDate.toISOString());

      if (Platform.OS === "web" && image.uri.startsWith("data:image")) {
        const blob = dataURItoBlob(image.uri);
        formData.append("image", blob, image.fileName || "ad.jpg");
      } else {
        formData.append("image", {
          uri: image.uri,
          name: image.fileName || "ad.jpg",
          type: "image/jpeg",
        } as any);
      }

      const response = await fetch(`${API_BASE_URL}/api/advertisements/create/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Upload failed:", err);
        Alert.alert("Error", JSON.stringify(err));
        return;
      }

      const data = await response.json();
      console.log("Upload success:", data);
      Alert.alert("Success", "Advertisement posted successfully!");

      // reset form
      setTitle("");
      setDescription("");
      setRedirectUrl("");
      setImage(null);
      setExpiryDate(new Date());
    } catch (error: any) {
      console.error("Error posting ad:", error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4 text-green-600">
        Post Advertisement
      </Text>

      {/* Title */}
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        className="border border-gray-300 rounded-lg p-3 mb-3"
      />

      {/* Description */}
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
        className="border border-gray-300 rounded-lg p-3 mb-3"
      />

      {/* Redirect URL */}
      <TextInput
        placeholder="Enter redirect URL"
        value={redirectUrl}
        onChangeText={setRedirectUrl}
        className="border border-gray-300 rounded-lg p-3 mb-3"
      />

      {/* Expiry Date */}
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="border border-gray-300 rounded-lg p-3 mb-3"
      >
        <Text>Expiry Date: {expiryDate.toISOString().split("T")[0]}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setExpiryDate(date);
          }}
        />
      )}

      {/* Image Picker */}
      <TouchableOpacity
        onPress={pickImage}
        className="border border-gray-300 rounded-lg p-3 mb-3 items-center"
      >
        <Text>{image ? "Change Image" : "Pick Image"}</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}

      {/* Submit button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        className="bg-green-600 rounded-lg p-3 items-center"
      >
        <Text className="text-white font-bold">
          {loading ? "Posting..." : "Post Advertisement"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostAdvertisement;
