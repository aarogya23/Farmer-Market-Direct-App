import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useLanguage } from '@/components/language-context';

export default function DashboardScreen() {
  const { language, t } = useLanguage();

  const stats =
    language === 'ne'
      ? [
          { label: t.dashboard.todaySales, value: 'रु 12,450' },
          { label: t.dashboard.newOrders, value: '18' },
          { label: t.dashboard.activeListings, value: '26' },
        ]
      : [
          { label: t.dashboard.todaySales, value: 'Rs 12,450' },
          { label: t.dashboard.newOrders, value: '18' },
          { label: t.dashboard.activeListings, value: '26' },
        ];

  const quickActions = [
    { icon: 'add-box' as const, label: t.dashboard.addProduct },
    { icon: 'receipt-long' as const, label: t.dashboard.manageOrders },
    { icon: 'cloud' as const, label: t.dashboard.weatherCenter },
    { icon: 'insights' as const, label: t.dashboard.priceWatch },
  ];

  const activities =
    language === 'ne'
      ? [
          'आज ६:३० बजे गोलभेंडा अर्डर पुष्टि भयो।',
          'पालुंगोको मूल्य तुलना अपडेट भयो।',
          'बेलुका वर्षाको चेतावनी प्राप्त भयो।',
        ]
      : [
          'Tomato order confirmed at 6:30 AM today.',
          'Spinach price comparison was updated.',
          'Rain alert received for the evening.',
        ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{t.dashboard.title}</Text>
        <Text style={styles.heroText}>{t.dashboard.subtitle}</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.dashboard.quickActions}</Text>
        <View style={styles.actionGrid}>
          {quickActions.map((action) => (
            <View key={action.label} style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <MaterialIcons name={action.icon} size={22} color="#214d2b" />
              </View>
              <Text style={styles.actionText}>{action.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.dashboard.recentActivity}</Text>
        <View style={styles.activityList}>
          {activities.map((activity) => (
            <View key={activity} style={styles.activityItem}>
              <View style={styles.activityDot} />
              <Text style={styles.activityText}>{activity}</Text>
            </View>
          ))}
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
    padding: 20,
    paddingBottom: 32,
    gap: 18,
  },
  hero: {
    borderRadius: 28,
    padding: 24,
    backgroundColor: '#214d2b',
    gap: 8,
  },
  heroTitle: {
    color: '#fff8ea',
    fontSize: 30,
    fontWeight: '800',
  },
  heroText: {
    color: '#dce7d4',
    fontSize: 15,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
  },
  statValue: {
    color: '#17301f',
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: '#6a786b',
    fontSize: 13,
    marginTop: 6,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: '#17301f',
    fontSize: 24,
    fontWeight: '800',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '47%',
    borderRadius: 20,
    padding: 16,
    backgroundColor: '#fffaf0',
    gap: 12,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dbe8cf',
  },
  actionText: {
    color: '#24402a',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  activityList: {
    borderRadius: 24,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    padding: 16,
    gap: 14,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  activityDot: {
    marginTop: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3ccd7c',
  },
  activityText: {
    flex: 1,
    color: '#304232',
    fontSize: 15,
    lineHeight: 22,
  },
});
