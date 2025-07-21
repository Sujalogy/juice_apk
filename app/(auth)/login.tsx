// app/(auth)/login.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import MessageBox from '../../components/MessageBox';
import { useAuthContext } from '../../hooks/useAuth';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

const LoginScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  // Ensure themeColors is correctly typed based on your Colors structure
  const themeColors = Colors[colorScheme ?? 'light'];

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  // Destructure with explicit types from useAuthContext, assuming it returns { user: UserType | null, isLoading: boolean, signIn: Function }
  const { signIn, isLoading }:any = useAuthContext();

  const handleLogin = async () => {
    setMessage('');
    setMessageVisible(false);
    const result = await signIn(username, password); // signIn function should be typed in useAuth.ts
    if (result.success) {
      router.replace('/');
    } else {
      setMessage(result.error || 'Login failed. Please try again.');
      setMessageVisible(true);
    }
  };

  return (
    <SafeAreaView style={[styles.authContainer, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.authScrollContainer}>
        <Image
          source={{ uri: 'https://placehold.co/150x150/FFC107/FFFFFF?text=Juice' }}
          style={styles.logo}
        />
        <Text style={[styles.authTitle, { color: themeColors.text }]}>Welcome to Juice APK!</Text>
        <CustomInput
          placeholder="Username or Email/Phone"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomButton
          title={isLoading ? 'Logging In...' : 'Login'}
          onPress={handleLogin}
          style={styles.authButton}
          disabled={isLoading} textStyle={undefined}        />
        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={[styles.authLink, { color: themeColors.accent }]}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
      <MessageBox message={message} visible={messageVisible} onClose={() => setMessageVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
  },
  authScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
    backgroundColor: Colors.light.primary,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  authButton: {
    marginTop: 10,
  },
  authLink: {
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
