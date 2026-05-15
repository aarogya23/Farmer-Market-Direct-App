import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import AdminDashboardScreen from "./AdminDashboardScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8080/api'; // Replace with actual backend URL in production

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [showAdmin, setShowAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!showAdmin) {
      fetchLiveProducts();
    }
  }, [showAdmin]);

  const fetchLiveProducts = async () => {
    try {
      setLoading(true);
      // We assume /api/products/allProducts or /api/products/test fetches APPROVED products.
      // We updated the backend so searchProducts returns APPROVED by default.
      const response = await fetch(`${API_URL}/products/test`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (showAdmin && user?.role === 'ADMIN') {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => setShowAdmin(false)}>
          <Text style={styles.backButtonText}>← Back to Market</Text>
        </TouchableOpacity>
        <AdminDashboardScreen />
      </View>
    );
  }

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productFarmer}>Sold by: {item.farmerName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.heading}>Live Marketplace</Text>
        <View style={styles.headerButtons}>
          {user?.role === 'ADMIN' && (
            <TouchableOpacity style={styles.adminBtn} onPress={() => setShowAdmin(true)}>
              <Text style={styles.adminBtnText}>Admin Panel</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.welcomeCard}>
        <Text style={styles.text}>Welcome, {user?.fullName || user?.name || "User"}</Text>
        <Text style={styles.text}>Role: {user?.role || "N/A"}</Text>
      </View>

      <Text style={styles.subHeading}>Fresh Products</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : products.length === 0 ? (
        <Text style={styles.emptyText}>No products available right now.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f5fff5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  headerButtons: {
    flexDirection: 'row',
  },
  adminBtn: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  adminBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  logoutBtn: {
    backgroundColor: "#b3261e",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  welcomeCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    marginTop: 4,
  },
  productDesc: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 6,
  },
  productFarmer: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 10,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
  },
  backButton: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButtonText: {
    color: '#1E40AF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
