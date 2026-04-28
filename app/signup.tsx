import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useLanguage } from '@/components/language-context';
import { AuthService } from '@/services/authService';
import { GoogleSignInButton } from '@/components/google-sign-in-button';

export default function SignupScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await AuthService.login({
        email: email.trim(),
        password: password.trim(),
      });

      // Save token to AsyncStorage
      await AsyncStorage.setItem('authToken', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response));

      setLoading(false);
      router.replace('/(tabs)/dashboard');
    } catch {
      setLoading(false);
      setError('Credential not correct');
    }
  }

  async function handleSignup() {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await AuthService.signup({
        fullName: fullName.trim(),
        email: email.trim(),
        password: password.trim(),
        role: 'FARMER', // Default role, can be customized
      });

      // Save token to AsyncStorage
      await AsyncStorage.setItem('authToken', response.token);
      await AsyncStorage.setItem('user', JSON.stringify(response));

      setLoading(false);
      router.replace('/(tabs)/dashboard');
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Signup failed. Please try again.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardWrap}
        behavior={Platform.OS === 'android' ? 'padding' : undefined}>
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
              <Text style={styles.titleAccent}>{isLogin ? t.signup.login : 'Create Account'}</Text> {isLogin ? t.signup.now : ''}
            </Text>
          </View>

          <View style={styles.formBlock}>
            {!isLogin && (
              <>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Full Name</Text>
                </View>
                <TextInput
                  placeholder="Enter your full name"
                  placeholderTextColor="#c0c4bf"
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </>
            )}

            <View style={styles.labelRow}>
              <Text style={styles.label}>{t.signup.emailLabel}</Text>
            </View>
            <TextInput
              placeholder={t.signup.emailPlaceholder}
              placeholderTextColor="#c0c4bf"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={[styles.labelRow, styles.spacedRow]}>
              <Text style={styles.label}>{t.signup.passwordLabel}</Text>
              {isLogin && <Text style={styles.secondaryText}>{t.signup.forgotPassword}</Text>}
            </View>
            <TextInput
              placeholder={t.signup.passwordPlaceholder}
              placeholderTextColor="#c0c4bf"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            {!isLogin && (
              <>
                <View style={[styles.labelRow, styles.spacedRow]}>
                  <Text style={styles.label}>{t.signup.phoneLabel}</Text>
                </View>
                <TextInput
                  placeholder={t.signup.phonePlaceholder}
                  placeholderTextColor="#c0c4bf"
                  keyboardType="phone-pad"
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                />
              </>
            )}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable 
            style={[styles.primaryButton, loading && styles.buttonDisabled]} 
            onPress={isLogin ? handleLogin : handleSignup}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isLogin ? t.signup.signIn : 'Sign Up'}
              </Text>
            )}
          </Pressable>

          {isLogin && (
            <>
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider} />
              </View>
              <GoogleSignInButton 
                buttonText="Continue with Google in Browser"
                role="BUYER"
              />
            </>
          )}

          <Pressable onPress={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </Text>
          </Pressable>
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
  demoCard: {
    marginTop: 20,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#eef7eb',
    borderWidth: 1,
    borderColor: '#d7ead3',
    gap: 4,
  },
  demoTitle: {
    color: '#214d2b',
    fontSize: 14,
    fontWeight: '800',
  },
  demoText: {
    color: '#345239',
    fontSize: 14,
    fontWeight: '600',
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
  buttonDisabled: {
    backgroundColor: '#a8d9b8',
    opacity: 0.7,
  },
  errorText: {
    marginTop: 16,
    color: '#a63a2d',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  toggleButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  toggleText: {
    color: '#3ccd7c',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
