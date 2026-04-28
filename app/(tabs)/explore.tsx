import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const weatherCards = [
    { id: 'w1', title: 'Heavy Rain Alert', icon: 'cloud-queue' as MaterialIconName, color: '#d32f2f', desc: 'Tonight 9 PM - 4 AM', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=500&q=80' },
    { id: 'w2', title: 'Strong Winds', icon: 'air' as MaterialIconName, color: '#f57c00', desc: 'Friday 1 PM - 5 PM', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=80' },
  ];

  const cropRecommendations = [
    { id: 'c1', name: 'Capsicum', margin: 'High margin', reason: 'Premium urban demand', image: 'https://images.unsplash.com/photo-1599599810949-e6ac4c006a27?auto=format&fit=crop&w=500&q=80' },
    { id: 'c2', name: 'Mustard Greens', margin: 'Steady margin', reason: 'Fast harvest cycle', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80' },
    { id: 'c3', name: 'Turmeric', margin: 'Seasonal upside', reason: 'Rising price trend', image: 'https://images.unsplash.com/photo-1599599810489-a8c6ab9b3e1f?auto=format&fit=crop&w=500&q=80' },
    { id: 'c4', name: 'Spinach', margin: 'Good margin', reason: 'Restaurant demand', image: 'https://images.unsplash.com/photo-1597848212624-611481c62109?auto=format&fit=crop&w=500&q=80' },
  ];

  const marketTrends = [
    { id: 'm1', market: 'Wholesale', crop: 'Tomatoes', trend: '+12%', status: 'up', image: 'https://images.unsplash.com/photo-1515182629504-727d7753751f?auto=format&fit=crop&w=500&q=80' },
    { id: 'm2', market: 'Retail', crop: 'Spinach', trend: '+8%', status: 'up', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80' },
    { id: 'm3', market: 'Bulk Buyers', crop: 'Rice', trend: '-3%', status: 'down', image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=500&q=80' },
    { id: 'm4', market: 'Urban Stores', crop: 'Potato', trend: '+5%', status: 'up', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=500&q=80' },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: Math.max(insets.top, 12) + 6,
          paddingBottom: 132 + Math.max(insets.bottom, 8),
        },
      ]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Market Insights</Text>
        <Text style={styles.headerSubtitle}>Weather, crop tips & price signals</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weather Alerts</Text>
        <View style={styles.weatherGrid}>
          {weatherCards.map((card) => (
            <Pressable key={card.id} style={styles.weatherCard}>
              <Image source={{ uri: card.image }} style={styles.weatherImage} />
              <View style={styles.weatherOverlay} />
              <View style={styles.weatherInfo}>
                <View style={[styles.weatherIconBg, { backgroundColor: card.color }]}>
                  <MaterialIcons name={card.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.weatherTitle} numberOfLines={2}>
                  {card.title}
                </Text>
                <Text style={styles.weatherDesc} numberOfLines={1}>
                  {card.desc}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Crop Recommendations</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View style={styles.cropGrid}>
          {cropRecommendations.map((crop) => (
            <Pressable key={crop.id} style={styles.cropCard}>
              <Image source={{ uri: crop.image }} style={styles.cropImage} />
              <View style={styles.cropInfo}>
                <Text style={styles.cropName} numberOfLines={2}>
                  {crop.name}
                </Text>
                <Text style={styles.cropMargin} numberOfLines={1}>
                  {crop.margin}
                </Text>
                <Text style={styles.cropReason} numberOfLines={2}>
                  {crop.reason}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Market Trends</Text>
        <View style={styles.trendsContainer}>
          {marketTrends.map((trend) => (
            <Pressable key={trend.id} style={styles.trendCard}>
              <Image source={{ uri: trend.image }} style={styles.trendImage} />
              <View style={styles.trendOverlay} />
              <View style={styles.trendInfo}>
                <View style={styles.trendLabels}>
                  <Text style={styles.trendMarket}>{trend.market}</Text>
                  <Text style={styles.trendCrop} numberOfLines={2}>
                    {trend.crop}
                  </Text>
                </View>
                <View style={[styles.trendBadge, { borderColor: trend.status === 'up' ? '#4caf50' : '#f44336' }]}>
                  <MaterialIcons name={trend.status === 'up' ? 'trending-up' : 'trending-down'} size={16} color={trend.status === 'up' ? '#4caf50' : '#f44336'} />
                  <Text style={[styles.trendValue, { color: trend.status === 'up' ? '#4caf50' : '#f44336' }]}>{trend.trend}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f6f3e8' },
  content: { paddingHorizontal: 16 },
  header: { marginBottom: 18, gap: 4 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#17301f', lineHeight: 32 },
  headerSubtitle: { fontSize: 14, color: '#7d847d', lineHeight: 20 },
  section: { marginBottom: 18 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#17301f', lineHeight: 20 },
  seeAll: { fontSize: 13, color: '#4caf50', fontWeight: '600' },
  weatherGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  weatherCard: { width: '48%', height: 160, borderRadius: 18, overflow: 'hidden', backgroundColor: '#fff' },
  weatherImage: { width: '100%', height: '100%' },
  weatherOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' },
  weatherInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, gap: 6 },
  weatherIconBg: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  weatherTitle: { fontSize: 13, fontWeight: '700', color: '#fff' },
  weatherDesc: { fontSize: 11, color: '#ddd' },
  cropGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  cropCard: { width: '48%', backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', minHeight: 182, borderWidth: 1, borderColor: '#efe7d7' },
  cropImage: { width: '100%', height: 112, backgroundColor: '#e9ece5' },
  cropInfo: { flex: 1, padding: 12, justifyContent: 'flex-end' },
  cropName: { fontSize: 13, fontWeight: '700', color: '#17301f', lineHeight: 18 },
  cropMargin: { fontSize: 11, color: '#4caf50', fontWeight: '600', marginTop: 3 },
  cropReason: { fontSize: 10, color: '#999', marginTop: 2, lineHeight: 14 },
  trendsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  trendCard: { width: '48%', height: 144, borderRadius: 18, overflow: 'hidden', backgroundColor: '#fff' },
  trendImage: { width: '100%', height: '100%' },
  trendOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  trendInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  trendLabels: { flex: 1 },
  trendMarket: { fontSize: 11, color: '#ddd', fontWeight: '600' },
  trendCrop: { fontSize: 12, fontWeight: '700', color: '#fff', marginTop: 2 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4, paddingHorizontal: 6, borderRadius: 6, borderWidth: 1.5, backgroundColor: 'rgba(255,255,255,0.15)' },
  trendValue: { fontSize: 11, fontWeight: '700' },
});
