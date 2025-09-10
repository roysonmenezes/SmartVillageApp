// import { View, Text, StyleSheet } from "react-native";

// export default function VillagerHome() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>This is Villagers Home Page</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5F5F5",
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#333",
//   },
// });

import { View, Text, ScrollView } from "react-native";
import AdvertisementCarousel from "@/components/AdvertisementCarousel"; // ✅ import

export default function VillagerHome() {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* ✅ Carousel on top */}
      <AdvertisementCarousel />

      {/* Page heading */}
      <View className="flex-1 items-center justify-center mt-6">
        <Text className="text-2xl font-bold text-gray-800">
          This is Villagers Home Pageee
        </Text>
      </View>
    </ScrollView>
  );
}
