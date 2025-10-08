import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function VillagerLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#28a745", // ✅ Active icon color (green)
        tabBarInactiveTintColor: "gray",   // Inactive icon color
        tabBarStyle: {
          backgroundColor: "white",       // ✅ Background color of bottom tab
          borderTopColor: "#28bb4aff",      // ✅ Green border on top
          borderTopWidth: 2,              // Thickness of the border
          height: 60,
          paddingBottom: 10,            // Adds padding at the bottom
          marginBottom: 10,                     // Optional: adjust tab height
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {/* ✅ Main Tabs */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
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
        name="GrievanceListScreen"
        options={{
          title: "Grievances",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="alert-circle" color={color} size={size} />
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

      {/* 🚀 Hidden Screens */}
      <Tabs.Screen name="edit-profile" options={{ href: null }} />
      <Tabs.Screen name="SubmitGrievanceScreen" options={{ href: null }} />
      <Tabs.Screen name="surveys/[id]" options={{ href: null }} />
    </Tabs>
  );
}
