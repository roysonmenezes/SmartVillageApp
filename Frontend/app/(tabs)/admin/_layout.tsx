// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function AdminLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: "#ffffff", // white background
//           borderTopColor: "#22c55e", // green top border
//           borderTopWidth: 2,
//         },
//         tabBarActiveTintColor: "#22c55e", // green for selected icon
//         tabBarInactiveTintColor: "#999999", // gray for inactive icons
//       }}
//     >
//       {/* Dashboard */}
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Dashboard",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="speedometer" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Donations */}
//       <Tabs.Screen
//         name="donations"
//         options={{
//           title: "Donations",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="cash" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Events */}
//       <Tabs.Screen
//         name="events"
//         options={{
//           title: "Events",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="calendar" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Users */}
//       <Tabs.Screen
//         name="manage-users"
//         options={{
//           title: "Users",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="people" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Profile */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Announcements */}
//       <Tabs.Screen
//         name="announcements"
//         options={{
//           title: "Announcements",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="megaphone" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Surveys */}
//       <Tabs.Screen
//         name="surveyList"
//         options={{
//           title: "Surveys",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="clipboard" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Advertisements */}
//       <Tabs.Screen
//         name="PostAdvertisement"
//         options={{
//           title: "Advertisements",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="images" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Grievances */}
//       <Tabs.Screen
//         name="AdminGrievanceScreen"
//         options={{
//           title: "Grievances",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="alert-circle" color={color} size={size} />
//           ),
//         }}
//       />

//       {/* Hidden screens (not in bottom tab) */}
//       <Tabs.Screen name="edit-profile" options={{ href: null }} />
//       <Tabs.Screen name="GrievanceDetailScreen" options={{ href: null }} />
//       <Tabs.Screen name="createSurvey" options={{ href: null }} />
//       <Tabs.Screen name="surveyDetail/[id]" options={{ href: null }} />
//     </Tabs>
//   );
// }


import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5e9146", // green when selected
        tabBarInactiveTintColor: "gray",  // gray when unselected
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#5e9146",
          borderTopWidth: 2,
          height: 60,
          paddingBottom: 10,
          marginBottom: 40,   // same as villager layout
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="speedometer" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="donations"
        options={{
          title: "Donations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="manage-users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="announcements"
        options={{
          title: "Announcements",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="surveyList"
        options={{
          title: "Surveys",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="PostAdvertisement"
        options={{
          title: "Advertisements",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="images" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="AdminGrievanceScreen"
        options={{
          title: "Grievances",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" color={color} size={size} />
          ),
        }}
      />

      {/* Hidden Screens */}
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="GrievanceDetailScreen" options={{ href: null }} />
      <Tabs.Screen name="createSurvey" options={{ href: null }} />
      <Tabs.Screen name="surveyDetail/[id]" options={{ href: null }} />
    </Tabs>
  );
}
