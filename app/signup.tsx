import { Link } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLanguage } from '@/components/language-context';

export default function SignupScreen() {
  const { t } = useLanguage();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.headerRow}>
            <Text style={styles.brand}>{t.splash.brandTop} {t.splash.brandBottom}</Text>
            <Text style={styles.closeMark}>x</Text>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.hello}>{t.signup.hello}</Text>
            <Text style={styles.title}>
              <Text style={styles.titleAccent}>{t.signup.login}</Text> {t.signup.now}
            </Text>
          </View>

          <View style={styles.formBlock}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>{t.signup.emailLabel}</Text>
            </View>
            <TextInput placeholder={t.signup.emailPlaceholder} placeholderTextColor="#c0c4bf" style={styles.input} />

            <View style={[styles.labelRow, styles.spacedRow]}>
              <Text style={styles.label}>{t.signup.passwordLabel}</Text>
              <Text style={styles.secondaryText}>{t.signup.forgotPassword}</Text>
            </View>
            <TextInput placeholder={t.signup.passwordPlaceholder} placeholderTextColor="#c0c4bf" secureTextEntry style={styles.input} />

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>{t.signup.orWith}</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.labelRow}>
              <Text style={styles.label}>{t.signup.phoneLabel}</Text>
            </View>
            <TextInput placeholder={t.signup.phonePlaceholder} placeholderTextColor="#c0c4bf" keyboardType="phone-pad" style={styles.input} />
          </View>

          <Link href="/(tabs)" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>{t.signup.signIn}</Text>
            </Pressable>
          </Link>
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
    minHeight: '100%',
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
    maxWidth: 260,
  },
  closeMark: {
    color: '#d5d7d1',
    fontSize: 28,
    lineHeight: 28,
  },
  titleBlock: {
    marginTop: 42,
    gap: 2,
  },
  hello: {
    color: '#171d17',
    fontSize: 34,
    fontWeight: '800',
  },
  title: {
    color: '#171d17',
    fontSize: 34,
    fontWeight: '800',
  },
  titleAccent: {
    color: '#3ccd7c',
  },
  formBlock: {
    marginTop: 34,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacedRow: {
    marginTop: 22,
  },
  label: {
    color: '#262c26',
    fontSize: 13,
    fontWeight: '700',
  },
  secondaryText: {
    color: '#b6bab5',
    fontSize: 12,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e6e2d7',
    borderRadius: 8,
    backgroundColor: '#fffdf7',
    height: 50,
    paddingHorizontal: 14,
    color: '#1b201b',
    fontSize: 15,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 22,
    marginBottom: 22,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ebe7db',
  },
  dividerText: {
    color: '#c0c4bf',
    fontSize: 12,
  },
  primaryButton: {
    marginTop: 36,
    alignSelf: 'center',
    minWidth: 160,
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
