import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.heading}>Authenticated</Text>
        <Text style={styles.text}>Name: {user?.fullName || user?.name || "N/A"}</Text>
        <Text style={styles.text}>Email: {user?.email || "N/A"}</Text>
        <Text style={styles.text}>Role: {user?.role || "N/A"}</Text>

        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5fff5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    gap: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#222",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#b3261e",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
