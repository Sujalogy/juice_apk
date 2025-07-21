// app/(tabs)/juices.js (JuicesScreen)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // For icons
import CustomButton from '../../components/CustomButton';
import MessageBox from '../../components/MessageBox';
import { useAuthContext } from '../../hooks/useAuth';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

const JuicesScreen = () => {
  const { role } = useAuthContext();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [juices, setJuices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    fetchJuices();
  }, []);

  const fetchJuices = async () => {
    setLoading(true);
    // Simulate API call to fetch juices
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockJuices = [
          { _id: 'j1', name: 'Orange Delight', price: 5.99, isAvailable: true, imageUrl: 'https://placehold.co/100x100/FFC107/FFFFFF?text=Orange' },
          { _id: 'j2', name: 'Green Detox', price: 6.50, isAvailable: true, imageUrl: 'https://placehold.co/100x100/8BC34A/FFFFFF?text=Green' },
          { _id: 'j3', name: 'Berry Blast', price: 7.25, isAvailable: false, imageUrl: 'https://placehold.co/100x100/FF5722/FFFFFF?text=Berry' },
        ];
        setJuices(mockJuices);
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  const handleDeleteJuice = async (juiceId) => {
    setMessage('');
    setMessageVisible(false);
    // Simulate API call to delete juice
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setJuices(juices.filter(j => j._id !== juiceId));
        setMessage('Juice deleted successfully!');
        setMessageVisible(true);
        setLoading(false);
        resolve(true);
      }, 500);
    });
  };

  const handleAddJuice = () => {
    setMessage('Add Juice functionality would be here!');
    setMessageVisible(true);
  };

  const handleEditJuice = (juice) => {
    setMessage(`Edit Juice functionality for ${juice.name} would be here!`);
    setMessageVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Our Juices</Text>

        {(role === 'juice_stall_owner' || role === 'super_admin') && (
          <CustomButton title="Add New Juice" onPress={handleAddJuice} style={{ backgroundColor: themeColors.secondary }} />
        )}

        {loading ? (
          <ActivityIndicator size="large" color={themeColors.primary} style={styles.loadingIndicator} />
        ) : juices.length > 0 ? (
          juices.map((juice) => (
            <View key={juice._id} style={[styles.juiceCard, { backgroundColor: themeColors.white }]}>
              <Image source={{ uri: juice.imageUrl }} style={styles.juiceImage} />
              <View style={styles.juiceInfo}>
                <Text style={[styles.juiceName, { color: themeColors.text }]}>{juice.name}</Text>
                <Text style={[styles.juicePrice, { color: themeColors.lightText }]}>${juice.price.toFixed(2)}</Text>
                <Text style={[styles.juiceStatus, { color: themeColors.darkGray }]}>
                  {juice.isAvailable ? 'Available' : 'Out of Stock'}
                </Text>
              </View>
              {(role === 'juice_stall_owner' || role === 'super_admin') && (
                <View style={styles.juiceActions}>
                  <TouchableOpacity onPress={() => handleEditJuice(juice)} style={styles.actionButton}>
                    <Ionicons name="create-outline" size={24} color={themeColors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteJuice(juice._id)} style={styles.actionButton}>
                    <Ionicons name="trash-outline" size={24} color={themeColors.red} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text style={[styles.noDataText, { color: themeColors.darkGray }]}>No juices found.</Text>
        )}
      </ScrollView>
      <MessageBox message={message} visible={messageVisible} onClose={() => setMessageVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  juiceCard: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  juiceImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    backgroundColor: Colors.light.lightGray,
  },
  juiceInfo: {
    flex: 1,
  },
  juiceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  juicePrice: {
    fontSize: 16,
  },
  juiceStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  juiceActions: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  actionButton: {
    marginLeft: 10,
    padding: 5,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default JuicesScreen; // Added default export
