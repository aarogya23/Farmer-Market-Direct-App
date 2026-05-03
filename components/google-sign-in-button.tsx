import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { AuthService } from '@/services/authService';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_WEB_CLIENT_ID = '639860129650-blov3f5j9c86if893v6iahv80s1261eu.apps.googleusercontent.com';
const GOOGLE_ANDROID_CLIENT_ID = '639860129650-i194uq7rtklb2mcdmelrvagk1ookniai.apps.googleusercontent.com';

interface GoogleSignInButtonProps {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
  role?: 'FARMER' | 'BUYER' | 'ADMIN';
  buttonText?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  role = 'BUYER',
  buttonText = 'Sign in with Google',
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    const idToken = response?.type === 'success' ? response.params?.id_token : undefined;

    if (idToken) {
      void handleGoogleResponse(idToken);
      return;
    }

    if (response?.type === 'error') {
      const message = response.error?.message || 'Google authentication failed';
      if (onError) {
        onError(new Error(message));
      } else {
        Alert.alert('Sign-In Failed', message);
      }
      setLoading(false);
    }
  }, [onError, response]);

  const handleGoogleResponse = async (idToken: string) => {
    try {
      const authResponse = await AuthService.googleLogin(idToken, role);
      await AsyncStorage.setItem('authToken', authResponse.token);
      await AsyncStorage.setItem('user', JSON.stringify(authResponse));

      if (onSuccess) {
        onSuccess(authResponse.token);
      } else {
        router.replace('/(tabs)/dashboard');
      }
    } catch (error: any) {
      const errorMsg = error.message || 'Google login failed';
      if (onError) {
        onError(new Error(errorMsg));
      } else {
        Alert.alert('Sign-In Failed', errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePress = async () => {
    if (!request) {
      Alert.alert('Sign-In Failed', 'Unable to initialize Google authentication');
      return;
    }

    setLoading(true);

    try {
      await promptAsync({ showInRecents: true });
    } catch (error: any) {
      const errorMsg = error.message || 'Unable to start Google authentication';
      if (onError) {
        onError(new Error(errorMsg));
      } else {
        Alert.alert('Sign-In Failed', errorMsg);
      }
      setLoading(false);
    }
  };

  return (
    <Pressable style={[styles.button, loading && styles.buttonDisabled]} onPress={handlePress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <>
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
