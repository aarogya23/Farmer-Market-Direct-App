import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter, useFocusEffect } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '@/components/language-context';
import { ProductService, Product } from '@/services/productService';

interface UserData {
  fullName?: string;
  email?: string;
  role?: string;
}

export default function DashboardScreen() {
  const { t } = useLanguage();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const loadUserData = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserData(JSON.parse(user));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      setLoadingProducts(true);
      const data = await ProductService.getMyProducts();
      setProducts(data.slice(0, 3)); // Show only first 3 products
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  const firstName = userData?.fullName?.split(' ')[0] || 'Farmer';
  const isAdmin = userData?.role === 'ADMIN';

  const stats = [
    { label: t.dashboard.todaySales, value: 'Rs 12,450', icon: 'payments' as const },
    { label: t.dashboard.newOrders, value: '18', icon: 'shopping-bag' as const },
    { label: t.dashboard.activeListings, value: '26', icon: 'inventory' as const },
  ];

  const actions = isAdmin
    ? [
        {
          label: 'Admin Products',
          icon: 'admin-panel-settings' as const,
          onPress: () => router.push('../(tabs)/admin-products' as any),
        },
        {
          label: 'All Products',
          icon: 'storefront' as const,
          onPress: () => router.push('../(tabs)/admin-products' as any),
        },
        { label: t.dashboard.manageOrders, icon: 'receipt-long' as const, onPress: undefined },
        { label: t.dashboard.weatherCenter, icon: 'cloud' as const, onPress: undefined },
      ]
    : [
        {
          label: t.dashboard.addProduct,
          icon: 'add-box' as const,
          onPress: () => router.push('../(tabs)/product' as any),
        },
        {
          label: 'My Products',
          icon: 'store' as const,
          onPress: () => router.push('../(tabs)/my-products' as any),
        },
        { label: t.dashboard.manageOrders, icon: 'receipt-long' as const, onPress: undefined },
        { label: t.dashboard.weatherCenter, icon: 'cloud' as const, onPress: undefined },
      ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, 12) + 8,
          paddingBottom: 28 + Math.max(insets.bottom, 8),
        },
      ]}>
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroCopy}>
            <Text style={styles.helloText}>Hi {firstName}</Text>
            <Text style={styles.heroTitle}>{t.dashboard.title}</Text>
          </View>
          <View style={styles.heroBadge}>
            <MaterialIcons name="agriculture" size={22} color="#214d2b" />
          </View>
        </View>
        <Text style={styles.heroSubtitle}>{t.dashboard.subtitle}</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <View style={styles.statIcon}>
              <MaterialIcons name={stat.icon} size={20} color="#214d2b" />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.dashboard.quickActions}</Text>
        <View style={styles.actionGrid}>
          {actions.map((action) => (
            <Pressable
              key={action.label}
              style={styles.actionCard}
              onPress={action.onPress}>
              <MaterialIcons name={action.icon} size={24} color="#214d2b" />
              <Text style={styles.actionText}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>My Recent Products</Text>
          {products.length > 0 && (
            <Pressable onPress={() => router.push('../(tabs)/my-products' as any)}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          )}
        </View>
        {loadingProducts ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#214d2b" />
          </View>
        ) : products.length === 0 ? (
          <View style={styles.emptyProductCard}>
            <MaterialIcons name="inventory-2" size={32} color="#9ccc65" />
            <Text style={styles.emptyProductText}>No products added yet</Text>
            <Text style={styles.emptyProductSubText}>Add your first product</Text>
          </View>
        ) : (
          <View style={styles.productsContainer}>
            {products.map((product) => (
              <Pressable
                key={product.id}
                style={styles.productPreviewCard}
                onPress={() => router.push('../(tabs)/my-products' as any)}>
                <View style={styles.productPreviewHeader}>
                  <Text style={styles.productPreviewName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={styles.productPreviewPrice}>Rs {product.price}</Text>
                </View>
                <Text style={styles.productPreviewDesc} numberOfLines={1}>
                  {product.description}
                </Text>
                <View style={styles.productPreviewFooter}>
                  <Text style={styles.productPreviewQty}>Stock: {product.quantity}</Text>
                  <View style={styles.productPreviewCategory}>
                    <Text style={styles.productPreviewCategoryText}>{product.category}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.dashboard.recentActivity}</Text>
        <View style={styles.activityCard}>
          <Text style={styles.activityText}>1. Order placed for tomatoes</Text>
          <Text style={styles.activityText}>2. Weather advisory updated</Text>
          <Text style={styles.activityText}>3. Buyer inquiry received</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f3e8',
  },
  content: {
    paddingHorizontal: 20,
    gap: 18,
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#214d2b',
    gap: 8,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 16,
  },
  heroCopy: {
    flex: 1,
    gap: 8,
  },
  heroBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dce7d4',
  },
  helloText: {
    color: '#dce7d4',
    fontSize: 14,
    fontWeight: '700',
  },
  heroTitle: {
    color: '#fff8ea',
    fontSize: 30,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#dce7d4',
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 280,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    gap: 8,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe8cf',
  },
  statValue: {
    color: '#17301f',
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: '#68746a',
    fontSize: 12,
    lineHeight: 17,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: '#17301f',
    fontSize: 22,
    fontWeight: '800',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#fffaf0',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    gap: 10,
    minHeight: 88,
    justifyContent: 'center',
  },
  actionText: {
    color: '#214d2b',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  activityCard: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    gap: 12,
  },
  activityText: {
    color: '#304232',
    fontSize: 15,
    lineHeight: 22,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#214d2b',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyProductCard: {
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    alignItems: 'center',
    gap: 8,
  },
  emptyProductText: {
    color: '#214d2b',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyProductSubText: {
    color: '#666',
    fontSize: 12,
  },
  productsContainer: {
    gap: 10,
  },
  productPreviewCard: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    gap: 8,
  },
  productPreviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  productPreviewName: {
    flex: 1,
    color: '#214d2b',
    fontSize: 14,
    fontWeight: '700',
  },
  productPreviewPrice: {
    color: '#214d2b',
    fontSize: 13,
    fontWeight: '800',
  },
  productPreviewDesc: {
    color: '#666',
    fontSize: 12,
    lineHeight: 16,
  },
  productPreviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPreviewQty: {
    color: '#666',
    fontSize: 11,
  },
  productPreviewCategory: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  productPreviewCategoryText: {
    color: '#214d2b',
    fontSize: 10,
    fontWeight: '600',
  },
});
