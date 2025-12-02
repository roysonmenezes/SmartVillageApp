// import { View, Text, StyleSheet } from "react-native";

// export default function AdminHome() {
//   console.log("inside admin home pg")
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>This is Admin Home Page</Text>
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

import { View, Text, StyleSheet, ScrollView, Image} from "react-native";
import AdvertisementCarousel from "@/components/AdvertisementCarousel"; 

export default function AdminHome() {
  console.log("inside admin home pg");
  
  return (
      <ScrollView className="flex-1 bg-gray-100 mt-10">
        {/* 🔹 Carousel on top */}
        <AdvertisementCarousel />
  
        {/* 🔹 Poster Image below carousel */}
        <Image
          source={{
            uri: "https://i.ibb.co/CKWrnKSL/IMG-20251202-WA0004.jpg",
          }}
          style={{
            width: "95%",
            height: 520,
            resizeMode: "cover",
            borderRadius: 10,
            marginLeft :10,
            marginBottom: 20,
          }}
        />
  
       
      </ScrollView>
    );
}
