// components/CustomInput.js

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors'; // Adjust path as needed

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor={Colors.light.gray} // Use light mode gray by default
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    autoCapitalize="none" // Common for usernames/emails
  />
);

const styles = StyleSheet.create({
  input: {
    width: '90%',
    padding: 15,
    backgroundColor: Colors.light.white, // Use light mode white by default
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: Colors.light.text, // Use light mode text color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default CustomInput;
