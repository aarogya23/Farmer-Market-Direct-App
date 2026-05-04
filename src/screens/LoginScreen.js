import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen() {
  const { login, signup, error, setError } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const onSubmit = async () => {
    if (!email || !password || (isSignup && !fullName)) {
      Alert.alert("Missing fields", "Please fill all required fields.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      if (isSignup) {
        await signup(fullName, email, password, "BUYER");
        Alert.alert("Success", "Account created. Please login.");
        setMode("login");
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>{isSignup ? "Create Account" : "Login"}</Text>
        {isSignup && (
          <TextInput
            placeholder="Full name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        )}
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable style={styles.button} onPress={onSubmit} disabled={submitting}>
          <Text style={styles.buttonText}>{submitting ? "Please wait..." : isSignup ? "Sign Up" : "Login"}</Text>
        </Pressable>

        <Pressable onPress={() => setMode(isSignup ? "login" : "signup")}>
          <Text style={styles.switchText}>
            {isSignup ? "Already have an account? Login" : "No account? Create one"}
          </Text>
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
    backgroundColor: "#f6f7fb",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    gap: 10,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#1f7a1f",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  switchText: {
    textAlign: "center",
    color: "#0d4f8b",
    marginTop: 6,
  },
  error: {
    color: "#bf0000",
    marginTop: 4,
  },
});
