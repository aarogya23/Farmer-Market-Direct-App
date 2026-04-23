import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useLanguage } from '@/components/language-context';
import * as marketData from '@/constants/market-data';

const severityColors = {
  High: '#a63a2d',
  Medium: '#9a6840',
  Low: '#35603a',
} as const;

const fallbackWeatherAlerts = {
  en: [
    {
      id: 'weather-1',
      title: 'Heavy rainfall risk',
      severity: 'High' as const,
      window: 'Tonight, 9 PM to 4 AM',
      guidance: 'Cover harvested vegetables and delay spraying to avoid nutrient wash-off.',
    },
    {
      id: 'weather-2',
      title: 'Strong afternoon winds',
      severity: 'Medium' as const,
      window: 'Friday, 1 PM to 5 PM',
      guidance: 'Secure polyhouse sheets and postpone tomato staking until evening.',
    },
  ],
  ne: [
    {
      id: 'weather-1',
      title: 'भारी वर्षाको सम्भावना',
      severity: 'High' as const,
      window: 'आज राति ९ बजे देखि ४ बजे सम्म',
      guidance: 'भित्र्याइएका तरकारी छोप्नुहोस् र मल वा औषधि छर्न केही समय रोक्नुहोस्।',
    },
    {
      id: 'weather-2',
      title: 'दिउँसो तेज हावा',
      severity: 'Medium' as const,
      window: 'शुक्रबार, दिउँसो १ बजे देखि ५ बजे सम्म',
      guidance: 'प्लास्टिक टनेल वा पोलिहाउस सुरक्षित गर्नुहोस् र टमाटर बाँध्ने काम बेलुका गर्नुहोस्।',
    },
  ],
};

const fallbackCropSuggestions = {
  en: [
    {
      id: 'crop-1',
      crop: 'Capsicum',
      reason: 'Urban buyers are paying premium rates and current supply is low this week.',
      expectedMargin: 'High margin',
      waterNeed: 'Moderate water',
    },
    {
      id: 'crop-2',
      crop: 'Mustard Greens',
      reason: 'Fast harvest cycle fits upcoming rain window and repeat buyer demand is strong.',
      expectedMargin: 'Steady margin',
      waterNeed: 'Low water',
    },
    {
      id: 'crop-3',
      crop: 'Turmeric',
      reason: 'Longer cycle, but price trend is rising and cooperative buyers want bulk contracts.',
      expectedMargin: 'Seasonal upside',
      waterNeed: 'Moderate water',
    },
  ],
  ne: [
    {
      id: 'crop-1',
      crop: 'क्याप्सिकम',
      reason: 'सहरका ग्राहकले राम्रो मूल्य दिइरहेका छन् र यो हप्ताको आपूर्ति कम छ।',
      expectedMargin: 'उच्च नाफा',
      waterNeed: 'मध्यम पानी',
    },
    {
      id: 'crop-2',
      crop: 'रायो साग',
      reason: 'छोटो उत्पादन चक्र भएकाले मौसमसँग मिल्छ र नियमित ग्राहकको माग बलियो छ।',
      expectedMargin: 'स्थिर नाफा',
      waterNeed: 'कम पानी',
    },
    {
      id: 'crop-3',
      crop: 'बेसार',
      reason: 'लामो चक्र भए पनि मूल्य बढ्दो छ र सहकारी खरिदकर्ताले थोक सम्झौता चाहिरहेका छन्।',
      expectedMargin: 'मौसमी फाइदा',
      waterNeed: 'मध्यम पानी',
    },
  ],
};

const fallbackPriceSignals = {
  en: [
    { market: 'Wholesale market', crop: 'Tomatoes', trend: '+12%', note: 'Supply dropped after rain.' },
    { market: 'Retail stores', crop: 'Spinach', trend: '+8%', note: 'Restaurants increasing orders.' },
    { market: 'Bulk buyers', crop: 'Rice', trend: '-3%', note: 'Stable inventory this week.' },
  ],
  ne: [
    { market: 'थोक बजार', crop: 'गोलभेंडा', trend: '+12%', note: 'वर्षापछि आपूर्ति घट्यो।' },
    { market: 'खुद्रा पसल', crop: 'पालुंगो', trend: '+8%', note: 'रेस्टुरेन्टको अर्डर बढेको छ।' },
    { market: 'थोक खरिदकर्ता', crop: 'चामल', trend: '-3%', note: 'यो हप्ता भण्डार स्थिर छ।' },
  ],
};

export default function InsightsScreen() {
  const { language, t } = useLanguage();
  const weatherAlerts =
    typeof marketData.getWeatherAlerts === 'function'
      ? marketData.getWeatherAlerts(language)
      : fallbackWeatherAlerts[language];
  const cropSuggestions =
    typeof marketData.getCropSuggestions === 'function'
      ? marketData.getCropSuggestions(language)
      : fallbackCropSuggestions[language];
  const priceSignals =
    typeof marketData.getPriceSignals === 'function'
      ? marketData.getPriceSignals(language)
      : fallbackPriceSignals[language];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.headerEyebrow}>{t.insights.eyebrow}</Text>
        <Text style={styles.headerTitle}>{t.insights.title}</Text>
        <Text style={styles.headerText}>{t.insights.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.insights.weatherAlerts}</Text>
        {weatherAlerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <View style={styles.alertTopRow}>
              <View style={styles.alertTitleRow}>
                <MaterialIcons name="cloud" size={18} color="#214d2b" />
                <Text style={styles.alertTitle}>{alert.title}</Text>
              </View>
              <View
                style={[
                  styles.severityBadge,
                  {
                    backgroundColor: severityColors[alert.severity],
                  },
                ]}>
                <Text style={styles.severityText}>{alert.severity}</Text>
              </View>
            </View>
            <Text style={styles.alertWindow}>{alert.window}</Text>
            <Text style={styles.alertGuidance}>{alert.guidance}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.insights.cropSuggestions}</Text>
        {cropSuggestions.map((crop) => (
          <View key={crop.id} style={styles.cropCard}>
            <View style={styles.cropHeader}>
              <Text style={styles.cropName}>{crop.crop}</Text>
              <MaterialIcons name="eco" size={20} color="#467b4d" />
            </View>
            <Text style={styles.cropReason}>{crop.reason}</Text>
            <View style={styles.cropMetaRow}>
              <View style={styles.cropMetaPill}>
                <Text style={styles.cropMetaText}>{crop.expectedMargin}</Text>
              </View>
              <View style={styles.cropMetaPill}>
                <Text style={styles.cropMetaText}>{crop.waterNeed}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.insights.marketSignals}</Text>
        <View style={styles.signalBoard}>
          {priceSignals.map((signal) => (
            <View key={`${signal.market}-${signal.crop}`} style={styles.signalRow}>
              <View style={styles.signalPrimary}>
                <Text style={styles.signalMarket}>{signal.market}</Text>
                <Text style={styles.signalCrop}>{signal.crop}</Text>
              </View>
              <View style={styles.signalTrendWrap}>
                <Text style={styles.signalTrend}>{signal.trend}</Text>
                <Text style={styles.signalNote}>{signal.note}</Text>
              </View>
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
  headerCard: {
    borderRadius: 30,
    padding: 24,
    backgroundColor: '#fffaf0',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    gap: 10,
  },
  headerEyebrow: {
    color: '#467b4d',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  headerTitle: {
    color: '#17301f',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  headerText: {
    color: '#5d695f',
    fontSize: 15,
    lineHeight: 23,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: '#17301f',
    fontSize: 24,
    fontWeight: '800',
  },
  alertCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#fffdf7',
    borderWidth: 1,
    borderColor: '#ebe4d3',
    gap: 10,
  },
  alertTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  alertTitle: {
    color: '#17301f',
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  severityBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  severityText: {
    color: '#fff8ea',
    fontSize: 12,
    fontWeight: '800',
  },
  alertWindow: {
    color: '#6c756c',
    fontSize: 13,
    fontWeight: '700',
  },
  alertGuidance: {
    color: '#334434',
    fontSize: 15,
    lineHeight: 22,
  },
  cropCard: {
    borderRadius: 24,
    padding: 18,
    backgroundColor: '#dbe8cf',
    gap: 10,
  },
  cropHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cropName: {
    color: '#17301f',
    fontSize: 20,
    fontWeight: '800',
  },
  cropReason: {
    color: '#2b3d2c',
    fontSize: 15,
    lineHeight: 22,
  },
  cropMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cropMetaPill: {
    borderRadius: 999,
    backgroundColor: 'rgba(255, 250, 240, 0.72)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cropMetaText: {
    color: '#305534',
    fontSize: 13,
    fontWeight: '700',
  },
  signalBoard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ebe4d3',
  },
  signalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    padding: 16,
    backgroundColor: '#fffdf7',
    borderBottomWidth: 1,
    borderBottomColor: '#efe8d8',
  },
  signalPrimary: {
    flex: 1,
    gap: 4,
  },
  signalMarket: {
    color: '#17301f',
    fontSize: 16,
    fontWeight: '800',
  },
  signalCrop: {
    color: '#6b756b',
    fontSize: 14,
  },
  signalTrendWrap: {
    alignItems: 'flex-end',
    maxWidth: 150,
    gap: 4,
  },
  signalTrend: {
    color: '#2f6f3e',
    fontSize: 18,
    fontWeight: '800',
  },
  signalNote: {
    color: '#6c756c',
    fontSize: 12,
    textAlign: 'right',
  },
});
