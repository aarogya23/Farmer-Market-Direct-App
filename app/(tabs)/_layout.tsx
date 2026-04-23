import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useLanguage } from '@/components/language-context';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 8,
        },
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t.tabs.dashboard,
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.market,
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="storefront" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: t.tabs.insights,
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="insights" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t.tabs.profile,
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
