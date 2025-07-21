// app/(auth)/signup.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; // Import useRouter for navigation

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import MessageBox from '../../components/MessageBox';
import { useAuthContext } from '../../hooks/useAuth';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme'; // To use the color scheme

const SignupScreen = () => {
  const router = useRouter(); // Initialize router
  const colorScheme = useColorScheme(); // Get current color scheme
  const themeColors = Colors[colorScheme ?? 'light']; // Get theme-specific colors

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const { signUp, isLoading } = useAuthContext();

  const handleSignup = async () => {
    setMessage('');
    setMessageVisible(false);
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageVisible(true);
      return;
    }
    if (!username || !password || (!email && !phone)) {
      setMessage('Please fill in all required fields (username, password, and either email or phone).');
      setMessageVisible(true);
      return;
    }

    const result = await signUp(username, email, phone, password, 'user'); // Default role for signup
    if (result.success) {
      setMessage('Account created successfully! You are now logged in.');
      setMessageVisible(true);
      router.replace('/'); // Navigate to the main app after successful signup/login
    } else {
      setMessage(result.error || 'Signup failed. Please try again.');
      setMessageVisible(true);
    }
  };

  return (
    <SafeAreaView style={[styles.authContainer, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.authScrollContainer}>
        <Image
          source={{ uri: 'https://placehold.co/150x150/FFC107/FFFFFF?text=Juice' }} // Placeholder juice logo
          style={styles.logo}
        />
        <Text style={[styles.authTitle, { color: themeColors.text }]}>Create Your Juice APK Account</Text>
        <CustomInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Email (Optional)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Phone (Optional)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <CustomButton
          title={isLoading ? 'Signing Up...' : 'Sign Up'}
          onPress={handleSignup}
          style={styles.authButton}
          disabled={isLoading}
        />
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={[styles.authLink, { color: themeColors.accent }]}>Already have an account? Login</Text>
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

export default SignupScreen; // Added default export
