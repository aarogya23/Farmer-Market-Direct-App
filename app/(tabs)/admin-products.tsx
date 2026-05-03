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

import { useLanguage } from '@/components/language-context';
import { AppLanguage } from '@/constants/translations';
import { Product, ProductService } from '@/services/productService';

const CATEGORY_OPTIONS = ['ALL', 'VEGETABLE', 'FRUIT', 'DAIRY', 'GRAIN', 'MEAT', 'OTHER'] as const;
const SORT_OPTIONS = ['newest', 'oldest', 'price_asc', 'price_desc'] as const;
type CategoryType = Exclude<(typeof CATEGORY_OPTIONS)[number], 'ALL'>;

const PRODUCT_NAME_SUGGESTIONS: Record<AppLanguage, Record<CategoryType, string[]>> = {
  en: {
    VEGETABLE: ['Tomato', 'Potato', 'Onion', 'Cabbage', 'Cauliflower', 'Green Beans', 'Carrots'],
    FRUIT: ['Apple', 'Banana', 'Orange', 'Mango', 'Papaya', 'Strawberry', 'Grapes'],
    DAIRY: ['Milk', 'Curd', 'Cheese', 'Paneer', 'Ghee', 'Yogurt', 'Butter'],
    GRAIN: ['Rice', 'Wheat', 'Maize', 'Millet', 'Barley', 'Oats', 'Corn'],
    MEAT: ['Chicken','Goat', 'Mutton', 'Fish', 'Buff Meat', 'Pork', 'Beef'],
    OTHER: ['Honey', 'Mushroom', 'Eggs', 'Spices', 'Herbs', 'Nuts', 'Soybeans'],
  },
  ne: {
    VEGETABLE: ['टमाटर', 'आलु', 'प्याज', 'बन्दा', 'काउली', 'सिमी', 'गाजर'],
    FRUIT: ['स्याउ', 'केरा', 'सुन्तला', 'आँप', 'मेवा', 'स्ट्रबेरी', 'अंगुर'],
    DAIRY: ['दूध', 'दही', 'चिज', 'पनिर', 'घ्यू', 'दही (योगर्ट)', 'माखन'],
    GRAIN: ['चामल', 'गहुँ', 'मकै', 'कोदो', 'जौ', 'ओट्स', 'मकै दाना'],
    MEAT: ['कुखुराको मासु', 'खसीको मासु','खसीको मासु', 'माछा', 'भैँसीको मासु', 'सुँगुरको मासु', 'गाईको मासु'],
    OTHER: ['मह', 'च्याउ', 'अण्डा', 'मसला', 'जडीबुटी', 'सुकामेवा', 'सोयाबिन'],
  },
};

const ADMIN_COPY: Record<
  AppLanguage,
  {
    title: string;
    searchAndFilter: string;
    searchPlaceholder: string;
    minPrice: string;
    maxPrice: string;
    category: string;
    sort: string;
    apply: string;
    reset: string;
    allProducts: string;
    items: string;
    retry: string;
    noProducts: string;
    adjustFilters: string;
    noDescription: string;
    price: string;
    quantity: string;
    sortLabels: Record<(typeof SORT_OPTIONS)[number], string>;
  }
> = {
  en: {
    title: 'Admin Products List',
    searchAndFilter: 'Search and Filter',
    searchPlaceholder: 'Search by product name',
    minPrice: 'Min price',
    maxPrice: 'Max price',
    category: 'Category',
    sort: 'Sort',
    apply: 'Apply',
    reset: 'Reset',
    allProducts: 'All Farmer Products',
    items: 'items',
    retry: 'Retry',
    noProducts: 'No products found',
    adjustFilters: 'Try another search or adjust filters.',
    noDescription: 'No description',
    price: 'Price',
    quantity: 'Qty',
    sortLabels: {
      newest: 'Newest',
      oldest: 'Oldest',
      price_asc: 'Price Low to High',
      price_desc: 'Price High to Low',
    },
  },
  ne: {
    title: 'व्यवस्थापन उत्पादन सूची',
    searchAndFilter: 'खोज र फिल्टर',
    searchPlaceholder: 'उत्पादन नामबाट खोज्नुहोस्',
    minPrice: 'न्यूनतम मूल्य',
    maxPrice: 'अधिकतम मूल्य',
    category: 'श्रेणी',
    sort: 'क्रमबद्ध',
    apply: 'लागू गर्नुहोस्',
    reset: 'रिसेट',
    allProducts: 'सबै किसान उत्पादनहरू',
    items: 'वटा',
    retry: 'फेरि प्रयास गर्नुहोस्',
    noProducts: 'कुनै उत्पादन फेला परेन',
    adjustFilters: 'अर्को खोज गर्नुहोस् वा फिल्टर परिवर्तन गर्नुहोस्।',
    noDescription: 'विवरण छैन',
    price: 'मूल्य',
    quantity: 'परिमाण',
    sortLabels: {
      newest: 'नयाँ पहिले',
      oldest: 'पुरानो पहिले',
      price_asc: 'कम मूल्यदेखि बढी',
      price_desc: 'बढी मूल्यदेखि कम',
    },
  },
};

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

export default function AdminProductsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t, language } = useLanguage();
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
  const copy = ADMIN_COPY[language];

  const getCategoryLabel = (value: string) => {
    if (value === 'ALL') {
      return language === 'ne' ? 'सबै' : 'ALL';
    }

    if (value in t.product.categories) {
      return t.product.categories[value as CategoryType];
    }

    return value;
  };

  const getDisplayProductName = (name: string, productCategory: string) => {
    if (language !== 'ne') {
      return name;
    }

    if (!(productCategory in PRODUCT_NAME_SUGGESTIONS.en)) {
      return name;
    }

    const categoryKey = productCategory as CategoryType;
    const englishNames = PRODUCT_NAME_SUGGESTIONS.en[categoryKey];
    const nepaliNames = PRODUCT_NAME_SUGGESTIONS.ne[categoryKey];
    const matchedIndex = englishNames.findIndex(
      (englishName) => normalizeValue(englishName) === normalizeValue(name)
    );

    return matchedIndex >= 0 ? nepaliNames[matchedIndex] : name;
  };

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
          paddingBottom: 28 + Math.max(insets.bottom, 8),
        },
      ]}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#214d2b" />
        </Pressable>
        <Text style={styles.headerTitle}>{copy.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.filterCard}>
        <Text style={styles.sectionTitle}>{copy.searchAndFilter}</Text>
        <TextInput
          style={styles.input}
          placeholder={copy.searchPlaceholder}
          placeholderTextColor="#9aa39a"
          value={query}
          onChangeText={setQuery}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder={copy.minPrice}
            placeholderTextColor="#9aa39a"
            keyboardType="numeric"
            value={minPrice}
            onChangeText={setMinPrice}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder={copy.maxPrice}
            placeholderTextColor="#9aa39a"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />
        </View>

        <Text style={styles.filterLabel}>{copy.category}</Text>
        <View style={styles.chipRow}>
          {CATEGORY_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[styles.chip, category === option && styles.chipSelected]}
              onPress={() => setCategory(option)}>
              <Text style={[styles.chipText, category === option && styles.chipTextSelected]}>
                {getCategoryLabel(option)}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.filterLabel}>{copy.sort}</Text>
        <View style={styles.chipRow}>
          {SORT_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[styles.chip, sort === option && styles.chipSelected]}
              onPress={() => setSort(option)}>
              <Text style={[styles.chipText, sort === option && styles.chipTextSelected]}>
                {copy.sortLabels[option]}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.actionRow}>
          <Pressable style={styles.primaryButton} onPress={loadProducts}>
            <Text style={styles.primaryButtonText}>{copy.apply}</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={resetFilters}>
            <Text style={styles.secondaryButtonText}>{copy.reset}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.sectionTitle}>{copy.allProducts}</Text>
        <Text style={styles.resultCount}>{products.length} {copy.items}</Text>
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
            <Text style={styles.primaryButtonText}>{copy.retry}</Text>
          </Pressable>
        </View>
      ) : products.length === 0 ? (
        <View style={styles.centerContainer}>
          <MaterialIcons name="inventory-2" size={46} color="#9ccc65" />
          <Text style={styles.emptyText}>{copy.noProducts}</Text>
          <Text style={styles.emptySubText}>{copy.adjustFilters}</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{getDisplayProductName(product.name, product.category)}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{getCategoryLabel(product.category)}</Text>
                </View>
              </View>

              <Text style={styles.productDescription}>
                {product.description || copy.noDescription}
              </Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{copy.price}: Rs {product.price}</Text>
                <Text style={styles.metaText}>{copy.quantity}: {product.quantity}</Text>
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
