import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useLanguage } from '@/components/language-context';

interface UserData {
  token: string;
  tokenType: string;
  userId: string;
  fullName: string;
  email: string;
  role: 'FARMER' | 'ADMIN' | 'BUYER' | string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserData(JSON.parse(user));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['authToken', 'user']);
              router.replace('/signup');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.screen, styles.centerContent]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.screen, styles.centerContent]}>
        <Text style={styles.loadingText}>No user data found. Please login.</Text>
        <Pressable
          style={styles.loginButton}
          onPress={() => router.replace('/signup')}>
          <Text style={styles.loginButtonText}>Go to Login</Text>
        </Pressable>
      </View>
    );
  }

  const normalizedRole =
    userData.role === 'ADMIN' || userData.role === 'BUYER' || userData.role === 'FARMER'
      ? userData.role
      : 'FARMER';

  const nameLabelByRole = {
    FARMER: t.profile.farmerName,
    ADMIN: t.profile.adminName,
    BUYER: t.profile.buyerName,
  } as const;

  const details = [
    { label: nameLabelByRole[normalizedRole], value: userData.fullName },
    { label: 'Email', value: userData.email },
    { label: t.profile.role, value: t.profile.roleNames[normalizedRole] },
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={34} color="#214d2b" />
        </View>
        <Text style={styles.title}>{userData.fullName}</Text>
        <Text style={styles.subtitle}>{t.profile.roleNames[normalizedRole]}</Text>
      </View>

      <View style={styles.detailCard}>
        {details.map((detail) => (
          <View key={detail.label} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{detail.label}</Text>
            <Text style={styles.detailValue}>{detail.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.supportCard}>
        <Pressable style={styles.supportRow}>
          <MaterialIcons name="support-agent" size={20} color="#214d2b" />
          <Text style={styles.supportText}>{t.profile.support}</Text>
        </Pressable>
        <Pressable style={styles.supportRow} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#8b5234" />
          <Text style={[styles.supportText, styles.logoutText]}>{t.profile.logout}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f3e8',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 18,
  },
  loadingText: {
    color: '#17301f',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  loginButton: {
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#214d2b',
  },
  loginButtonText: {
    color: '#fff8ea',
    fontSize: 16,
    fontWeight: '700',
  },
  headerCard: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#fffaf0',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe8cf',
  },
  title: {
    color: '#17301f',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#657166',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  detailCard: {
    borderRadius: 24,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    overflow: 'hidden',
  },
  detailRow: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efe8d8',
    gap: 4,
  },
  detailLabel: {
    color: '#758076',
    fontSize: 13,
    fontWeight: '700',
  },
  detailValue: {
    color: '#17301f',
    fontSize: 17,
    fontWeight: '700',
  },
  supportCard: {
    borderRadius: 24,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    padding: 18,
    gap: 16,
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supportText: {
    color: '#24402a',
    fontSize: 16,
    fontWeight: '700',
  },
  logoutText: {
    color: '#8b5234',
  },
});
