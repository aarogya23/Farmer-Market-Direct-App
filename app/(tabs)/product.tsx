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
import { useLanguage } from '@/components/language-context';

const API_BASE_URL = 'http://192.168.1.68:8082';
const CATEGORY_OPTIONS = ['VEGETABLE', 'FRUIT', 'DAIRY', 'GRAIN', 'MEAT', 'OTHER'] as const;
const PRICE_OPTIONS = ['50', '100', '150', '200', '250', '500'] as const;
const QUANTITY_OPTIONS = ['5', '10', '25', '50', '100'] as const;
type CategoryType = (typeof CATEGORY_OPTIONS)[number];
type DropdownKey = 'category' | 'name' | 'price' | 'quantity';

const PRODUCT_NAME_SUGGESTIONS: Record<CategoryType, string[]> = {
  VEGETABLE: ['Tomato', 'Potato', 'Onion', 'Cabbage', 'Cauliflower', 'Green Beans', 'Carrots'],
  FRUIT: ['Apple', 'Banana', 'Orange', 'Mango', 'Papaya', 'Mango', 'Strawberry', 'Grapes'],
  DAIRY: ['Milk', 'Curd', 'Cheese', 'Paneer', 'Ghee', 'Yogurt', 'Butter'],
  GRAIN: ['Rice', 'Wheat', 'Maize', 'Millet', 'Barley', 'Oats', 'Corn'],
  MEAT: ['Chicken', 'Mutton', 'Fish', 'Buff Meat', 'Pork', 'Beef'],
  OTHER: ['Honey', 'Mushroom', 'Eggs', 'Spices', 'Herbs', 'Nuts', 'Soybeans'],
};

interface LoggedInUser {
  fullName?: string;
  email?: string;
  token?: string;
  [key: string]: any;
}

export default function AddProductScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<CategoryType | ''>('');
  const [description, setDescription] = useState('');
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const nameOptions = category ? PRODUCT_NAME_SUGGESTIONS[category] : [];

  const renderDropdown = (
    key: DropdownKey,
    label: string,
    value: string,
    options: string[],
    placeholder: string,
    onSelect: (value: string) => void
  ) => {
    const isOpen = openDropdown === key;

    return (
      <View style={styles.dropdownWrap}>
        <Text style={styles.label}>{label}</Text>
        <Pressable style={styles.dropdownButton} onPress={() => setOpenDropdown(isOpen ? null : key)}>
          <Text style={[styles.dropdownText, !value && styles.dropdownPlaceholder]}>
            {value || placeholder}
          </Text>
          <Text style={styles.dropdownArrow}>{isOpen ? '▲' : '▼'}</Text>
        </Pressable>
        {isOpen ? (
          <View style={styles.dropdownMenu}>
            {options.map((option) => (
              <Pressable
                key={option}
                style={[styles.dropdownOption, value === option && styles.dropdownOptionSelected]}
                onPress={() => {
                  onSelect(option);
                  setOpenDropdown(null);
                }}>
                <Text
                  style={[
                    styles.dropdownOptionText,
                    value === option && styles.dropdownOptionTextSelected,
                  ]}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
    );
  };

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
      setError(t.product.requiredError);
      return;
    }

    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);
    if (Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError(t.product.invalidPriceError);
      return;
    }

    if (!Number.isInteger(numericQuantity) || numericQuantity <= 0) {
      setError(t.product.invalidQuantityError);
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
      Alert.alert(t.product.successTitle, t.product.successMessage, [
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
      setOpenDropdown(null);
    } catch (e: any) {
      console.error('Add product failed', e);
      setLoading(false);
      setError(e?.message || t.product.saveFailedError);
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
            <Text style={styles.title}>{t.product.title}</Text>
            {user?.fullName ? (
              <Text style={styles.userText}>
                {t.product.forUser} {user.fullName}
              </Text>
            ) : null}
          </View>

          <View style={styles.formBlock}>
            {renderDropdown(
              'category',
              t.product.categoryLabel,
              category ? t.product.categories[category] : '',
              CATEGORY_OPTIONS.map((option) => t.product.categories[option]),
              t.product.selectCategory,
              (selectedLabel) => {
                const selectedCategory = CATEGORY_OPTIONS.find(
                  (option) => t.product.categories[option] === selectedLabel
                );
                if (!selectedCategory) {
                  return;
                }
                setCategory(selectedCategory);
                setName('');
              }
            )}

            {renderDropdown(
              'name',
              t.product.nameLabel,
              name,
              nameOptions,
              category ? t.product.selectProductName : t.product.chooseCategoryFirst,
              setName
            )}

            {renderDropdown(
              'price',
              t.product.priceLabel,
              price ? `Rs ${price}` : '',
              PRICE_OPTIONS.map((option) => `Rs ${option}`),
              t.product.selectPrice,
              (selectedPrice) => setPrice(selectedPrice.replace('Rs ', ''))
            )}

            {renderDropdown(
              'quantity',
              t.product.quantityLabel,
              quantity,
              [...QUANTITY_OPTIONS],
              t.product.selectQuantity,
              setQuantity
            )}

            <Text style={styles.label}>{t.product.descriptionLabel}</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder={t.product.descriptionPlaceholder}
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
                <Text style={styles.primaryButtonText}>{t.product.saveButton}</Text>
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
  dropdownWrap: {
    gap: 8,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#e6e2d7',
    borderRadius: 10,
    backgroundColor: '#fffdf7',
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    color: '#1b201b',
    fontSize: 15,
    flex: 1,
  },
  dropdownPlaceholder: {
    color: '#9aa39a',
  },
  dropdownArrow: {
    color: '#68746a',
    fontSize: 12,
    marginLeft: 10,
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#e6e2d7',
    borderRadius: 10,
    backgroundColor: '#fffdf7',
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efe9da',
  },
  dropdownOptionSelected: {
    backgroundColor: '#e8f2e2',
  },
  dropdownOptionText: {
    color: '#214d2b',
    fontSize: 14,
    fontWeight: '600',
  },
  dropdownOptionTextSelected: {
    color: '#17301f',
    fontWeight: '700',
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