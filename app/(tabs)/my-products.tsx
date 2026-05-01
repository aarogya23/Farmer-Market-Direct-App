import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter, useFocusEffect } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '@/components/language-context';
import { ProductService, Product } from '@/services/productService';

export default function MyProductsScreen() {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ProductService.getMyProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await ProductService.getMyProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh products');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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
        <Text style={styles.headerTitle}>My Products</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#214d2b" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="error-outline" size={48} color="#d32f2f" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={loadProducts}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </Pressable>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="inventory-2" size={48} color="#9ccc65" />
          <Text style={styles.emptyText}>No products yet</Text>
          <Text style={styles.emptySubText}>Add your first product to get started</Text>
          <Pressable
            style={styles.addButton}
            onPress={() => router.push('../(tabs)/product' as any)}>
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add Product</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text style={styles.sectionHeader}>Total Products: {products.length}</Text>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{product.category}</Text>
                </View>
              </View>

              <Text style={styles.productDescription} numberOfLines={2}>
                {product.description}
              </Text>

              <View style={styles.productMetaRow}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="local-offer" size={16} color="#214d2b" />
                  <Text style={styles.metaValue}>Rs {product.price}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="inventory" size={16} color="#214d2b" />
                  <Text style={styles.metaValue}>{product.quantity} in stock</Text>
                </View>
              </View>

              <View style={styles.productFooter}>
                <View style={styles.dateContainer}>
                  <MaterialIcons name="calendar-today" size={14} color="#666" />
                  <Text style={styles.dateText}>{formatDate(product.createdAt)}</Text>
                </View>
                <Pressable style={styles.editButton}>
                  <MaterialIcons name="edit" size={18} color="#214d2b" />
                </Pressable>
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
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e3d3',
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
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 12,
  },
  errorText: {
    fontSize: 14,
    color: '#d32f2f',
    textAlign: 'center',
    marginTop: 8,
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: '#214d2b',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#214d2b',
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#214d2b',
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e3d3',
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
    fontSize: 16,
    fontWeight: '700',
    color: '#214d2b',
  },
  categoryBadge: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#214d2b',
  },
  productDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  productMetaRow: {
    flexDirection: 'row',
    gap: 24,
    paddingTop: 4,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0ede0',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0ede0',
  },
});
