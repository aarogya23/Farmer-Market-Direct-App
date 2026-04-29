import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_BASE_URL = 'http://192.168.1.68:8082';
const CATEGORY_OPTIONS = ['VEGETABLE', 'FRUIT', 'DAIRY', 'GRAIN', 'MEAT', 'OTHER'] as const;

interface LoggedInUser {
  fullName?: string;
  email?: string;
  token?: string;
  [key: string]: any;
}

export default function AddProductScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number] | ''>('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user for product creation', e);
      }
    };

    loadUser();
  }, []);

  const handleAddProduct = async () => {
    if (!name.trim() || !price.trim() || !quantity.trim() || !category) {
      setError('Please fill in all required fields');
      return;
    }

    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (!Number.isInteger(numericQuantity) || numericQuantity <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const authToken = await AsyncStorage.getItem('authToken');

      const body = {
        name: name.trim(),
        price: numericPrice,
        quantity: numericQuantity,
        category,
        description: description.trim() || undefined,
        // Send logged-in user context so backend can resolve the farmer owner.
        ownerEmail: user?.email,
        ownerName: user?.fullName,
      };

      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(errorText || 'Failed to add product');
      }

      setLoading(false);
      Alert.alert('Success', 'Product added successfully', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);

      setName('');
      setPrice('');
      setQuantity('');
      setCategory('');
      setDescription('');
    } catch (e: any) {
      console.error('Add product failed', e);
      setLoading(false);
      setError(e?.message || 'Failed to add product. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'android' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Add New Product</Text>
            {user?.fullName ? (
              <Text style={styles.userText}>for {user.fullName}</Text>
            ) : null}
          </View>

          <View style={styles.formBlock}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Fresh Organic Tomatoes"
              placeholderTextColor="#c0c4bf"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Price (Rs)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 120"
              placeholderTextColor="#c0c4bf"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 25"
              placeholderTextColor="#c0c4bf"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryGrid}>
              {CATEGORY_OPTIONS.map((option) => {
                const isSelected = category === option;

                return (
                  <Pressable
                    key={option}
                    style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
                    onPress={() => setCategory(option)}>
                    <Text
                      style={[
                        styles.categoryChipText,
                        isSelected && styles.categoryChipTextSelected,
                      ]}>
                      {option}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.label}>Description (optional)</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Short description about your product"
              placeholderTextColor="#c0c4bf"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.primaryButton, loading && styles.buttonDisabled]}
              onPress={handleAddProduct}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.primaryButtonText}>Save Product</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f1',
  },
  keyboardWrap: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    color: '#17301f',
    fontSize: 22,
    fontWeight: '800',
  },
  userText: {
    color: '#68746a',
    fontSize: 13,
    fontWeight: '600',
  },
  formBlock: {
    gap: 16,
  },
  label: {
    marginTop: 8,
    marginBottom: 6,
    color: '#262c26',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e6e2d7',
    borderRadius: 10,
    backgroundColor: '#fffdf7',
    height: 48,
    paddingHorizontal: 14,
    color: '#1b201b',
    fontSize: 15,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: '#d7ead3',
    backgroundColor: '#fffdf7',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  categoryChipSelected: {
    backgroundColor: '#214d2b',
    borderColor: '#214d2b',
  },
  categoryChipText: {
    color: '#214d2b',
    fontSize: 13,
    fontWeight: '700',
  },
  categoryChipTextSelected: {
    color: '#ffffff',
  },
  multilineInput: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  errorText: {
    marginTop: 14,
    color: '#a63a2d',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonRow: {
    marginTop: 26,
    alignItems: 'center',
  },
  primaryButton: {
    minWidth: 170,
    borderRadius: 12,
    backgroundColor: '#3ccd7c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  buttonDisabled: {
    backgroundColor: '#a8d9b8',
    opacity: 0.8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});