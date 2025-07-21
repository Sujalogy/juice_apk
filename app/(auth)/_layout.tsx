// app/(auth)/_layout.tsx

import React from 'react';
import { Stack, Redirect } from 'expo-router'; // Import Redirect
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors'; // Adjust path as needed
import { useColorScheme } from '../../hooks/useColorScheme'; // Adjust path as needed
import { useAuthContext } from '../../hooks/useAuth'; // Import useAuthContext

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];
  const { user, isLoading } = useAuthContext(); // Access auth context here

  // If user is loading, or already authenticated, redirect away from auth screens
  if (isLoading) {
    return null; // Or a loading spinner if desired
  }

  if (user) {
    return <Redirect href="/" />; // Redirect authenticated users to the main app
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background }]}>
      <Stack
        screenOptions={{
          headerShown: false, // Hide header for auth screens
          animation: 'fade', // Smooth transition between login/signup
        }}
      >
        {/* These screens are now correctly nested under the (auth) group */}
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
