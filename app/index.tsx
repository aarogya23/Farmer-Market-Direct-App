import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/components/language-context';

export default function SplashScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroShell}>
          <View style={styles.heroShape}>
            <View style={[styles.line, styles.lineOne]} />
            <View style={[styles.line, styles.lineTwo]} />
            <View style={[styles.line, styles.lineThree]} />
            <View style={[styles.line, styles.lineFour]} />
          </View>

          <View style={styles.logoBadge}>
            <View style={styles.leafLeft} />
            <View style={styles.leafRight} />
          </View>
        </View>

        <View style={styles.copyBlock}>
          <Text style={styles.brandTop}>{t.splash.brandTop}</Text>
          <Text style={styles.brandBottom}>{t.splash.brandBottom}</Text>
          <Text style={styles.tagline}>{t.splash.tagline}</Text>
        </View>

        <Link href="/language" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{t.splash.next}</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fbf9f1',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 54,
    gap: 28,
  },
  heroShell: {
    width: '100%',
    alignItems: 'center',
  },
  heroShape: {
    width: '118%',
    aspectRatio: 1,
    maxHeight: 360,
    backgroundColor: '#3ccd7c',
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    overflow: 'hidden',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    borderColor: 'rgba(198, 255, 218, 0.28)',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  lineOne: {
    width: 250,
    height: 250,
    borderRadius: 32,
    transform: [{ rotate: '14deg' }],
    top: -70,
    left: -34,
  },
  lineTwo: {
    width: 210,
    height: 210,
    borderRadius: 28,
    transform: [{ rotate: '-18deg' }],
    top: 42,
    left: 28,
  },
  lineThree: {
    width: 240,
    height: 240,
    borderRadius: 34,
    transform: [{ rotate: '12deg' }],
    top: -36,
    right: -48,
  },
  lineFour: {
    width: 160,
    height: 160,
    borderRadius: 26,
    transform: [{ rotate: '-10deg' }],
    bottom: 56,
    right: 26,
  },
  logoBadge: {
    marginTop: -48,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#eef7eb',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#204b2b',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  leafLeft: {
    position: 'absolute',
    width: 18,
    height: 40,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 14,
    backgroundColor: '#11924a',
    transform: [{ rotate: '-18deg' }],
    left: 35,
    top: 28,
  },
  leafRight: {
    position: 'absolute',
    width: 20,
    height: 34,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 14,
    backgroundColor: '#31be6f',
    transform: [{ rotate: '68deg' }],
    left: 42,
    top: 40,
  },
  copyBlock: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
    width: '100%',
  },
  brandTop: {
    color: '#6f756e',
    fontSize: 20,
    fontWeight: '500',
  },
  brandBottom: {
    color: '#b0633c',
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
    textAlign: 'center',
  },
  tagline: {
    color: '#222a22',
    fontSize: 19,
    lineHeight: 30,
    textAlign: 'center',
    maxWidth: 340,
  },
  primaryButton: {
    width: '100%',
    maxWidth: 180,
    borderRadius: 12,
    backgroundColor: '#3ccd7c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 'auto',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
