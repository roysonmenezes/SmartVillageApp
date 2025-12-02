// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   TouchableOpacity,
//   SafeAreaView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import api from "@/utils/api";

// interface Grievance {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   status: string;
//   created_at: string;
// }

// export default function AdminGrievanceScreen() {
//   const [grievances, setGrievances] = useState<Grievance[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const router = useRouter();

//   const fetchGrievances = async () => {
//     try {
//       const res = await api.get("/api/grievances/");
//       setGrievances(res.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchGrievances();
//   }, []);

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "resolved":
//         return "bg-green-100 text-green-700";
//       case "pending":
//         return "bg-yellow-100 text-yellow-700";
//       case "in progress":
//         return "bg-blue-100 text-blue-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-50">
//         <ActivityIndicator size="large" color="#5e9146" />
//         <Text className="text-gray-500 mt-2">Loading grievances...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-50">
//       <View className="px-5 py-4 border-b border-gray-200 bg-white shadow-sm">
//         <Text className="text-2xl font-bold text-[#5e9146] mt-9 p-3">
//           Admin Grievances
//         </Text>
//         <Text className="text-gray-500 text-sm">
//           Review and manage reported issues
//         </Text>
//       </View>

//       <FlatList
//         data={grievances}
//         keyExtractor={(item) => item.id.toString()}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={fetchGrievances}
//             colors={["#5e9146"]}
//           />
//         }
//         contentContainerStyle={{ padding: 12 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() =>
//               router.push(`/(tabs)/admin/GrievanceDetailScreen?id=${item.id}` as any)
//             }
//             activeOpacity={0.8}
//           >
//             <View className="bg-white rounded-2xl shadow-md p-4 mb-4 border border-gray-100">
//               <Text className="text-lg font-semibold text-gray-900 mb-1">
//                 {item.title}
//               </Text>
//               <Text className="text-gray-700 text-base mb-2">
//                 {item.description.length > 100
//                   ? item.description.slice(0, 100) + "..."
//                   : item.description}
//               </Text>

//               <View className="flex-row justify-between items-center mt-2">
//                 <View className="flex-row space-x-2">
//                   <Text className="text-sm font-medium bg-green-50 text-green-800 px-3 py-1 rounded-full">
//                     {item.category}
//                   </Text>
//                 </View>
//                 <Text
//                   className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
//                     item.status
//                   )}`}
//                 >
//                   {item.status}
//                 </Text>
//               </View>

//               <Text className="text-xs text-gray-400 mt-2">
//                 Posted on {new Date(item.created_at).toLocaleString()}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         ListEmptyComponent={
//           <View className="flex-1 items-center justify-center py-20">
//             <Text className="text-gray-500 text-base">
//               No grievances found.
//             </Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/utils/api";

interface Grievance {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
}

export default function AdminGrievanceScreen() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchGrievances = async () => {
    try {
      const res = await api.get("/api/grievances/");
      setGrievances(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#5e9146" />
        <Text className="text-gray-500 mt-2">Loading grievances...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Page Header */}
      <View className="px-5 py-4 border-b border-gray-200 bg-white">
        <Text className="text-2xl font-bold text-center text-[#5e9146] mt-8 mb-1">
          Admin Grievances
        </Text>
        <Text className="text-gray-500 text-center text-sm">
          Review and manage reported issues
        </Text>
      </View>

      {/* Grievance List */}
      <FlatList
        data={grievances}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchGrievances}
            colors={["#5e9146"]}
          />
        }
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/(tabs)/admin/GrievanceDetailScreen?id=${item.id}` as any)
            }
            activeOpacity={0.8}
          >
            <View className="bg-gray-50 rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
              <Text className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </Text>
              <Text className="text-gray-700 text-base mb-2">
                {item.description.length > 100
                  ? item.description.slice(0, 100) + "..."
                  : item.description}
              </Text>

              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-sm font-medium bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                  {item.category}
                </Text>
                <Text
                  className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </Text>
              </View>

              <Text className="text-xs text-gray-400 mt-2">
                Posted on {new Date(item.created_at).toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500 text-base">
              No grievances found.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
