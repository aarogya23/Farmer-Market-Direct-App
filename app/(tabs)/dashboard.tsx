import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLanguage } from '@/components/language-context';

interface UserData {
  fullName?: string;
  email?: string;
}

export default function DashboardScreen() {
  const { t } = useLanguage();
  const [userData, setUserData] = useState<UserData | null>(null);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setUserData(JSON.parse(user));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
  }, []);

  const firstName = userData?.fullName?.split(' ')[0] || 'Farmer';

  const stats = [
    { label: t.dashboard.todaySales, value: 'Rs 12,450', icon: 'payments' as const },
    { label: t.dashboard.newOrders, value: '18', icon: 'shopping-bag' as const },
    { label: t.dashboard.activeListings, value: '26', icon: 'inventory' as const },
  ];

  const actions = [
    {
      label: t.dashboard.addProduct,
      icon: 'add-box' as const,
      onPress: () => router.push('../(tabs)/product' as any),
    },
    { label: t.dashboard.manageOrders, icon: 'receipt-long' as const, onPress: undefined },
    { label: t.dashboard.weatherCenter, icon: 'cloud' as const, onPress: undefined },
    { label: t.dashboard.priceWatch, icon: 'trending-up' as const, onPress: undefined },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, 12) + 8,
          paddingBottom: 132 + Math.max(insets.bottom, 8),
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
});
