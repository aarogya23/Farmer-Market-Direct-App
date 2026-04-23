import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useLanguage } from '@/components/language-context';

export default function ProfileScreen() {
  const { language, t } = useLanguage();

  const details =
    language === 'ne'
      ? [
          { label: t.profile.farmerName, value: 'राम किसान' },
          { label: t.profile.role, value: 'तरकारी उत्पादक' },
          { label: t.profile.location, value: 'चितवन, नेपाल' },
          { label: t.profile.phone, value: '+977 98XXXXXXXX' },
          { label: t.profile.language, value: 'नेपाली / English' },
        ]
      : [
          { label: t.profile.farmerName, value: 'Ram Farmer' },
          { label: t.profile.role, value: 'Vegetable producer' },
          { label: t.profile.location, value: 'Chitwan, Nepal' },
          { label: t.profile.phone, value: '+977 98XXXXXXXX' },
          { label: t.profile.language, value: 'Nepali / English' },
        ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={34} color="#214d2b" />
        </View>
        <Text style={styles.title}>{t.profile.title}</Text>
        <Text style={styles.subtitle}>{t.profile.subtitle}</Text>
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
        <View style={styles.supportRow}>
          <MaterialIcons name="support-agent" size={20} color="#214d2b" />
          <Text style={styles.supportText}>{t.profile.support}</Text>
        </View>
        <View style={styles.supportRow}>
          <MaterialIcons name="logout" size={20} color="#8b5234" />
          <Text style={[styles.supportText, styles.logoutText]}>{t.profile.logout}</Text>
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
