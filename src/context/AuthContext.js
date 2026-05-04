import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser, login as loginApi, signup as signupApi } from "../services/authService";

const STORAGE_KEY = "auth_token";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_KEY);
        if (!storedToken) {
          setLoading(false);
          return;
        }

        setToken(storedToken);
        const profile = await getCurrentUser(storedToken);
        setUser(profile);
      } catch (err) {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
        setError(err.message || "Session expired");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    setError("");
    const result = await loginApi(email, password);
    const jwt = result?.token;

    if (!jwt) {
      throw new Error("Token missing in login response");
    }

    await AsyncStorage.setItem(STORAGE_KEY, jwt);
    setToken(jwt);

    // Fetch authenticated user from GET endpoint after login.
    const profile = await getCurrentUser(jwt);
    setUser(profile);
  };

  const signup = async (fullName, email, password, role) => {
    setError("");
    await signupApi(fullName, email, password, role);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      loading,
      token,
      user,
      error,
      setError,
      login,
      signup,
      logout,
    }),
    [loading, token, user, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
