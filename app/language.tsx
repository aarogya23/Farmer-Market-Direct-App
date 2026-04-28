import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/components/language-context';

export default function LanguageScreen() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    {
      key: 'en' as const,
      title: 'English',
      subtitle: 'English language',
    },
    {
      key: 'ne' as const,
      title: 'नेपाली',
      subtitle: 'Nepali language',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.brand}>{t.splash.brandTop} {t.splash.brandBottom}</Text>
          <Link href="/signup" asChild>
            <Pressable style={styles.skipLink}>
              <Text style={styles.skipText}>{t.language.skip}</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.illustrationBox}>
          <View style={styles.translationCard} />
          <View style={styles.translationCardBack} />
          <Text style={styles.translationText}>A</Text>
          <Text style={styles.translationTextAlt}>Aa</Text>
        </View>

        <View style={styles.copyBlock}>
          <Text style={styles.title}>{t.language.title}</Text>
          <Text style={styles.subtitle}>{t.language.subtitle}</Text>
        </View>

        <View style={styles.list}>
          {languages.map((option) => (
            <Pressable
              key={option.key}
              style={styles.languageRow}
              onPress={() => setLanguage(option.key)}>
              <View style={[styles.radioOuter, option.key === language && styles.radioOuterActive]}>
                {option.key === language ? <View style={styles.radioInner} /> : null}
              </View>
              <View style={styles.languageTextWrap}>
                <Text style={[styles.languageText, option.key === language && styles.languageTextActive]}>
                  {option.title}
                </Text>
                <Text style={styles.languageSubtext}>{option.subtitle}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Link href="/signup" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{t.language.save}</Text>
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
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 54,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: '#b0633c',
    fontSize: 20,
    fontWeight: '700',
    maxWidth: 210,
  },
  skipLink: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  skipText: {
    color: '#868b85',
    fontSize: 15,
    fontWeight: '500',
  },
  illustrationBox: {
    marginTop: 46,
    width: 84,
    height: 84,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  translationCard: {
    position: 'absolute',
    width: 34,
    height: 46,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#b6bbb4',
    backgroundColor: '#fffdf7',
    left: 0,
    top: 8,
  },
  translationCardBack: {
    position: 'absolute',
    width: 34,
    height: 46,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#b6bbb4',
    backgroundColor: '#fffdf7',
    left: 22,
    top: 18,
  },
  translationText: {
    position: 'absolute',
    left: 10,
    top: 18,
    color: '#9aa198',
    fontSize: 28,
    fontWeight: '700',
  },
  translationTextAlt: {
    position: 'absolute',
    left: 32,
    top: 27,
    color: '#9aa198',
    fontSize: 24,
    fontWeight: '700',
  },
  copyBlock: {
    marginTop: 30,
    gap: 8,
  },
  title: {
    color: '#1a2019',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: '#8d938d',
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    marginTop: 34,
    borderTopWidth: 1,
    borderTopColor: '#ebe7db',
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 20,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ebe7db',
    width: '100%',
  },
  languageTextWrap: {
    flex: 1,
    gap: 2,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#d2d7d0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: '#3ccd7c',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3ccd7c',
  },
  languageText: {
    color: '#3d413d',
    fontSize: 16,
  },
  languageSubtext: {
    color: '#8d938d',
    fontSize: 13,
  },
  languageTextActive: {
    color: '#1a2019',
    fontWeight: '700',
  },
  primaryButton: {
    marginTop: 32,
    alignSelf: 'center',
    minWidth: 190,
    borderRadius: 12,
    backgroundColor: '#3ccd7c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 26,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
