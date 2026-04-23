import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { cropSuggestions, priceSignals, weatherAlerts } from '@/constants/market-data';

const severityColors = {
  High: '#a63a2d',
  Medium: '#9a6840',
  Low: '#35603a',
} as const;

export default function InsightsScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.headerEyebrow}>Smart farming support</Text>
        <Text style={styles.headerTitle}>Weather alerts and crop guidance in one place</Text>
        <Text style={styles.headerText}>
          Farmers can react faster to changing conditions, plan high-demand crops, and make better
          selling decisions with live pricing signals.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weather alerts</Text>
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
        <Text style={styles.sectionTitle}>Crop suggestions</Text>
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
        <Text style={styles.sectionTitle}>Market price signals</Text>
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
