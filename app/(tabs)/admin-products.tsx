import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Product, ProductService } from '@/services/productService';

const CATEGORY_OPTIONS = ['ALL', 'VEGETABLE', 'FRUIT', 'DAIRY', 'GRAIN', 'MEAT', 'OTHER'] as const;
const SORT_OPTIONS = ['newest', 'oldest', 'price_asc', 'price_desc'] as const;

export default function AdminProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [authorized, setAuthorized] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORY_OPTIONS)[number]>('ALL');
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]>('newest');

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data =
        query.trim() || minPrice.trim() || maxPrice.trim() || category !== 'ALL' || sort !== 'newest'
          ? await ProductService.searchProducts({
              q: query,
              category: category === 'ALL' ? undefined : category,
              minPrice: minPrice ? Number(minPrice) : undefined,
              maxPrice: maxPrice ? Number(maxPrice) : undefined,
              sort,
            })
          : await ProductService.getAllProducts();

      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category, maxPrice, minPrice, query, sort]);

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const rawUser = await AsyncStorage.getItem('user');
        const user = rawUser ? JSON.parse(rawUser) : null;

        if (user?.role !== 'ADMIN') {
          router.replace('/(tabs)/dashboard');
          return;
        }

        setAuthorized(true);
      } catch (err) {
        console.error('Failed to check admin role:', err);
        router.replace('/signup');
      } finally {
        setCheckingRole(false);
      }
    };

    checkAdminAccess();
  }, [router]);

  useEffect(() => {
    if (authorized) {
      loadProducts();
    }
  }, [authorized, loadProducts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
  }, [loadProducts]);

  const resetFilters = () => {
    setQuery('');
    setMinPrice('');
    setMaxPrice('');
    setCategory('ALL');
    setSort('newest');
  };

  if (checkingRole) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#214d2b" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, 12) + 8,
          paddingBottom: 132 + Math.max(insets.bottom, 8),
        },
      ]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#214d2b" />
        </Pressable>
        <Text style={styles.headerTitle}>Admin Products</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.filterCard}>
        <Text style={styles.sectionTitle}>Search and Filter</Text>
        <TextInput
          style={styles.input}
          placeholder="Search by product name"
          placeholderTextColor="#9aa39a"
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Min price"
            placeholderTextColor="#9aa39a"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Max price"
            placeholderTextColor="#9aa39a"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />
        </View>

        <Text style={styles.filterLabel}>Category</Text>
        <View style={styles.chipRow}>
          {CATEGORY_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[styles.chip, category === option && styles.chipSelected]}
              onPress={() => setCategory(option)}>
              <Text style={[styles.chipText, category === option && styles.chipTextSelected]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.filterLabel}>Sort</Text>
        <View style={styles.chipRow}>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[styles.chip, sort === option && styles.chipSelected]}
              onPress={() => setSort(option)}>
              <Text style={[styles.chipText, sort === option && styles.chipTextSelected]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.primaryButton} onPress={loadProducts}>
            <Text style={styles.primaryButtonText}>Apply</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={resetFilters}>
            <Text style={styles.secondaryButtonText}>Reset</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.sectionTitle}>All Farmer Products</Text>
        <Text style={styles.resultCount}>{products.length} items</Text>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#214d2b" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="error-outline" size={46} color="#b83a2f" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.primaryButton} onPress={loadProducts}>
            <Text style={styles.primaryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="inventory-2" size={46} color="#9ccc65" />
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubText}>Try another search or adjust filters.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
              </View>

              <Text style={styles.productDescription}>
                {product.description || 'No description'}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>Price: Rs {product.price}</Text>
                <Text style={styles.metaText}>Qty: {product.quantity}</Text>
              </View>

              <View style={styles.farmerCard}>
                <MaterialIcons name="person" size={16} color="#214d2b" />
                <Text style={styles.farmerText}>
                  {product.farmerName} ({product.farmerEmail})
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f3e8',
  },
  content: {
    paddingHorizontal: 16,
    gap: 14,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    gap: 12,
    backgroundColor: '#f6f3e8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0ede0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#214d2b',
  },
  filterCard: {
    backgroundColor: '#fffdf7',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e8e3d3',
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#17301f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e6e2d7',
    borderRadius: 12,
    backgroundColor: '#fffaf0',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#17301f',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5f6a60',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d7ead3',
    backgroundColor: '#fffdf7',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: '#214d2b',
    borderColor: '#214d2b',
  },
  chipText: {
    color: '#214d2b',
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextSelected: {
    color: '#fff8ea',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    borderRadius: 12,
    backgroundColor: '#214d2b',
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff8ea',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    borderRadius: 12,
    backgroundColor: '#ede7d6',
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#214d2b',
    fontWeight: '700',
    fontSize: 14,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultCount: {
    color: '#68746a',
    fontSize: 13,
    fontWeight: '700',
  },
  list: {
    gap: 12,
  },
  productCard: {
    backgroundColor: '#fffdf7',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e8e3d3',
    padding: 16,
    gap: 10,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  productName: {
    flex: 1,
    color: '#214d2b',
    fontSize: 16,
    fontWeight: '800',
  },
  categoryBadge: {
    borderRadius: 999,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    color: '#214d2b',
    fontSize: 11,
    fontWeight: '700',
  },
  productDescription: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 18,
  },
  metaText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '600',
  },
  farmerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0ede0',
  },
  farmerText: {
    flex: 1,
    color: '#4b5a4d',
    fontSize: 13,
    fontWeight: '600',
  },
  errorText: {
    color: '#b83a2f',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyText: {
    color: '#214d2b',
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubText: {
    color: '#666',
    fontSize: 13,
  },
});
