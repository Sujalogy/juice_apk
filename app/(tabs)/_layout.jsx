// app/(tabs)/_layout.js (Main Tab Navigator)

import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native'; // Import View for tabBarStyle background
import { Ionicons } from '@expo/vector-icons'; // For icons

import Colors from '../../constants/Colors'; // Adjust path as needed
import { useColorScheme } from '../../hooks/useColorScheme'; // Adjust path as needed

// A simple HapticTab and TabBarBackground for demonstration.
// In a real Expo project, these might be more complex components.
const HapticTab = ({ children, ...rest }) => (
  <View style={styles.hapticTabContainer}>
    {children}
  </View>
);

const TabBarBackground = () => (
  <View style={styles.tabBarBackground} />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.tint,
        headerShown: false,
        tabBarButton: HapticTab, // Using a simplified HapticTab for now
        tabBarBackground: TabBarBackground, // Using a simplified TabBarBackground
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent', // Transparent to show the custom background
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
            elevation: 0, // Remove default shadow
            shadowOpacity: 0, // Remove default shadow
          },
          default: {
            backgroundColor: themeColors.background, // Use theme background for Android/Web
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
            elevation: 5, // Shadow for Android
            shadowColor: themeColors.text, // Shadow for iOS (though iOS uses position:absolute for blur)
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index" // Corresponds to app/(tabs)/index.js (DashboardScreen)
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
        }}
      />
      {/* Removed the 'explore' tab to align with the provided screens.
        If you intend to have an 'explore' screen, ensure you have a file
        named 'app/(tabs)/explore.js' or 'app/(tabs)/explore.tsx'
        that exports a default React component.
      */}
      <Tabs.Screen
        name="juices" // Corresponds to app/(tabs)/juices.js
        options={{
          title: 'Juices',
          tabBarIcon: ({ color }) => <Ionicons name="nutrition" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sales" // Corresponds to app/(tabs)/sales.js
        options={{
          title: 'Sales',
          tabBarIcon: ({ color }) => <Ionicons name="cash" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="memberships" // Corresponds to app/(tabs)/memberships.js
        options={{
          title: 'Memberships',
          tabBarIcon: ({ color }) => <Ionicons name="medal" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile" // Corresponds to app/(tabs)/profile.js
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  hapticTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.light.background, // Use light mode background for the tab bar itself
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
