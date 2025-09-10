// import React, { useEffect, useState } from "react";
// import { View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
// import Carousel from "react-native-reanimated-carousel";
// import api from "@/utils/api"; // your axios wrapper
// import * as Linking from "expo-linking";

// interface Advertisement {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   redirect_url?: string;
//   expiry_date: string;
// }

// const { width } = Dimensions.get("window");

// const AdvertisementCarousel = () => {
//   const [ads, setAds] = useState<Advertisement[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAds();
//   }, []);

//   const fetchAds = async () => {
//     try {
//       const res = await api.get("api/advertisements/");
//       console.log("Fetched Ads :", res.data);
//       setAds(res.data);
//     } catch (error) {
//       console.error("Error fetching ads:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePress = (url?: string) => {
//     if (url) Linking.openURL(url);
//   };

//   if (loading) {
//     return (
//       <View className="flex items-center justify-center h-32">
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </View>
//     );
//   }

//   if (ads.length === 0) return null;

//   return (
//     <View className="my-2 border-green-500">
//       <Carousel
//         loop
//         autoPlay
//         autoPlayInterval={4000}
//         width={width}
//         height={200}
//         data={ads}
//         scrollAnimationDuration={1000}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => handlePress(item.redirect_url)}
//             className="items-center"
//           >
//             <Image
//               source={{ uri: item.image }}
//               style={{ width: width * 0.9, height: 200, borderRadius: 12 }}
//               resizeMode="cover"
//             />
//           </TouchableOpacity>

          
//         )}
//       />
//     </View>
//   );
// };

// export default AdvertisementCarousel;

import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import api from "@/utils/api";
import * as Linking from "expo-linking";

interface Advertisement {
  id: number;
  title: string;
  description: string;
  image: string;
  redirect_url?: string;
  expiry_date: string;
}

const { width } = Dimensions.get("window");

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // track current slide

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const res = await api.get("api/advertisements/");
      console.log("Fetched Ads :", res.data);
      setAds(res.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePress = (url?: string) => {
    if (url) Linking.openURL(url);
  };

  if (loading) {
    return (
      <View className="flex items-center justify-center h-32">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (ads.length === 0) return null;

  return (
    <View className="my-2 mx-4  rounded-xl overflow-hidden">
      <Carousel
        loop
        autoPlay
        autoPlayInterval={4000}
        width={width - 32} // account for mx-4
        height={200}
        data={ads}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActiveIndex(index)} // track active index
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item.redirect_url)}
            className="items-center"
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: width - 32, height: 200, borderRadius: 12 }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      {/* 🔹 Pagination dots */}
      <View className="flex-row justify-center mt-2 mb-1">
        {ads.map((_, index) => (
          <View
            key={index}
            className={`mx-1 rounded-full ${activeIndex === index ? "bg-green-500" : "bg-gray-300"}`}
            style={{ width: 8, height: 8 }}
          />
        ))}
      </View>
    </View>
  );
};

export default AdvertisementCarousel;
