import { View, Text, StyleSheet } from "react-native";

export default function VillagerHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>This is Villagers Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
});
