// app/_layout.tsx (Root Layout for Expo Router)

import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

// Import AuthProvider and useAuthContext from your hooks
import { AuthProvider, useAuthContext, useProtectedRoute } from '../hooks/useAuth';
import Colors from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';


// This is the main layout for your app.
// It conditionally renders the authentication flow or the main tabs.
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    // AuthProvider must wrap the entire navigation stack to provide context
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* AuthFlowManager handles the authentication redirection and renders the main Stack */}
        <AuthFlowManager />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

// This component manages the authentication flow and renders the main Stack.
function AuthFlowManager() {
  const { user, isLoading } = useAuthContext(); // Access auth context here
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  // Use the protected route hook to manage redirection based on auth state
  // This hook will handle redirects once isLoading is false
  useProtectedRoute(user, isLoading);

  // IMPORTANT: Explicitly return a loading state if isLoading is true.
  // This prevents any child components from trying to access `user` or `role`
  // before the AuthProvider has definitively set them.
  if (isLoading) {
    return (
      <View style={[styles.loadingScreen, { backgroundColor: themeColors.background }]}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={[styles.loadingText, { color: themeColors.text }]}>Loading App...</Text>
      </View>
    );
  }

  // Once isLoading is false, the user state is stable, and we can render the Stack.
  // The useProtectedRoute hook will handle the appropriate redirection (to / or /login).
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define the authentication group */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* Define the authenticated tabs group */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Define the not-found route */}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
  },
});
