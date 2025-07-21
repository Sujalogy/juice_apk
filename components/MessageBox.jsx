// components/MessageBox.js

import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import CustomButton from './CustomButton'; // Adjust path as needed
import Colors from '../constants/Colors'; // Adjust path as needed

const MessageBox = ({ message, visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.messageBoxOverlay}>
        <View style={styles.messageBoxContainer}>
          <Text style={styles.messageBoxText}>{message}</Text>
          <CustomButton title="OK" onPress={onClose} style={styles.messageBoxButton} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  messageBoxOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBoxContainer: {
    backgroundColor: Colors.light.white, // Use light mode white by default
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  messageBoxText: {
    fontSize: 18,
    color: Colors.light.text, // Use light mode text color
    marginBottom: 20,
    textAlign: 'center',
  },
  messageBoxButton: {
    width: '50%',
    backgroundColor: Colors.light.primary, // Use light mode primary by default
    borderRadius: 8,
    paddingVertical: 10,
  },
});

export default MessageBox;
