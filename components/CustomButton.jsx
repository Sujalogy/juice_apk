// components/CustomButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors'; // Adjust path as needed

const CustomButton = ({ title, onPress, style, textStyle, disabled = false }) => (
  <TouchableOpacity
    style={[styles.button, style, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary, // Use light mode primary by default
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: Colors.light.gray,
  },
  buttonText: {
    color: Colors.light.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
