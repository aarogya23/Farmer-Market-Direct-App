import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http:///192.168.1.68:8082/api'; // Replace with actual backend URL in production

export default function AdminDashboardScreen({ navigation }) {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/admin/products/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPendingProducts(data);
      } else {
        Alert.alert('Error', 'Failed to fetch pending products. Ensure you are an Admin.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (productId, status) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/admin/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        Alert.alert('Success', `Product ${status.toLowerCase()} successfully!`);
        fetchPendingProducts(); // Refresh list
      } else {
        Alert.alert('Error', 'Failed to update product status.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network error.');
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productDetail}>Price: ${item.price}</Text>
      <Text style={styles.productDetail}>Quantity: {item.quantity}</Text>
      <Text style={styles.productDetail}>Farmer: {item.farmerName}</Text>
      <Text style={styles.productDetail}>Category: {item.category}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={() => handleStatusUpdate(item.id, 'APPROVED')}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleStatusUpdate(item.id, 'REJECTED')}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Admin Dashboard</Text>
      <Text style={styles.subHeader}>Pending Products</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : pendingProducts.length === 0 ? (
        <Text style={styles.emptyText}>No pending products to review.</Text>
      ) : (
        <FlatList
          data={pendingProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  productDesc: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
  },
  productDetail: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  approveButton: {
    backgroundColor: '#10B981',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 50,
  }
});
