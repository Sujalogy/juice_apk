// app/(tabs)/sales.js (SalesScreen)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // For icons
import CustomButton from '../../components/CustomButton';
import MessageBox from '../../components/MessageBox';
import { useAuthContext } from '../../hooks/useAuth';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

const SalesScreen = () => {
  const { role } = useAuthContext();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [currentOrder, setCurrentOrder] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [juices, setJuices] = useState([]); // To fetch available juices
  const [loadingJuices, setLoadingJuices] = useState(true);

  useEffect(() => {
    if (role === 'juice_stall_owner' || role === 'super_admin') {
      fetchAvailableJuices();
    }
  }, [role]);

  useEffect(() => {
    // Calculate total amount whenever currentOrder changes
    const calculatedTotal = currentOrder.reduce((sum, item) => sum + (item.quantity * item.priceAtSale), 0);
    setTotalAmount(calculatedTotal);
  }, [currentOrder]);

  const fetchAvailableJuices = async () => {
    setLoadingJuices(true);
    // Simulate API call to fetch available juices
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockAvailableJuices = [
          { _id: 'j1', name: 'Orange Delight', price: 5.99, isAvailable: true },
          { _id: 'j2', name: 'Green Detox', price: 6.50, isAvailable: true },
          { _id: 'j4', name: 'Pineapple Punch', price: 6.20, isAvailable: true },
        ];
        setJuices(mockAvailableJuices);
        setLoadingJuices(false);
        resolve(true);
      }, 800);
    });
  };

  const handleAddItemToOrder = (juiceId, quantity = 1) => {
    const selectedJuice = juices.find(j => j._id === juiceId);
    if (!selectedJuice) {
      setMessage('Selected juice not found.');
      setMessageVisible(true);
      return;
    }

    const existingItemIndex = currentOrder.findIndex(item => item.juiceId === juiceId);
    if (existingItemIndex > -1) {
      // Update quantity if item already in order
      const updatedOrder = [...currentOrder];
      updatedOrder[existingItemIndex].quantity += quantity;
      setCurrentOrder(updatedOrder);
    } else {
      // Add new item to order
      setCurrentOrder([
        ...currentOrder,
        {
          juiceId: selectedJuice._id,
          name: selectedJuice.name,
          quantity: quantity,
          priceAtSale: selectedJuice.price,
          isMembershipRedemption: false, // Default to false
        }
      ]);
    }
    setMessage(`Added ${selectedJuice.name} to order.`);
    setMessageVisible(true);
  };

  const handleRemoveItem = (juiceId) => {
    setCurrentOrder(currentOrder.filter(item => item.juiceId !== juiceId));
    setMessage('Item removed from order.');
    setMessageVisible(true);
  };

  const handleProcessSale = async () => {
    if (currentOrder.length === 0) {
      setMessage('Order is empty. Please add items.');
      setMessageVisible(true);
      return;
    }
    setMessage('');
    setMessageVisible(false);

    // Simulate API call to record sale
    // In a real app, you'd send this to your Node.js backend: POST /api/sales
    const saleData = {
      orderNumber: `SALE-${Date.now()}`,
      items: currentOrder,
      totalAmount: totalAmount,
      paymentMethod: 'Cash', // Or selected method
      status: 'completed',
      saleDate: new Date(),
      // customerId: (if selected),
      // ownerId: (from auth context)
    };

    console.log('Processing Sale:', saleData);
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessage('Sale processed successfully!');
        setMessageVisible(true);
        setCurrentOrder([]); // Clear order after successful sale
        setTotalAmount(0);
        resolve(true);
      }, 2000);
    });
  };

  if (role !== 'juice_stall_owner' && role !== 'super_admin') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <View style={styles.centeredMessage}>
          <Text style={[styles.accessDeniedText, { color: themeColors.red }]}>Access Denied: Only Stall Owners can manage sales.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>New Sale</Text>

        <View style={[styles.card, { backgroundColor: themeColors.white }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Add Juices to Order</Text>
          {loadingJuices ? (
            <ActivityIndicator size="small" color={themeColors.primary} />
          ) : (
            <View>
              {juices.map((juice) => (
                <View key={juice._id} style={[styles.juiceSelectionRow, { borderBottomColor: themeColors.lightGray }]}>
                  <Text style={[styles.juiceSelectionText, { color: themeColors.text }]}>{juice.name} - ${juice.price.toFixed(2)}</Text>
                  <CustomButton
                    title="Add"
                    onPress={() => handleAddItemToOrder(juice._id)}
                    style={[styles.addJuiceButton, { backgroundColor: themeColors.accent }]}
                    textStyle={styles.addJuiceButtonText}
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.white }]}>
          <Text style={[styles.cardTitle, { color: themeColors.text }]}>Current Order</Text>
          {currentOrder.length === 0 ? (
            <Text style={[styles.noDataText, { color: themeColors.darkGray }]}>No items in order.</Text>
          ) : (
            currentOrder.map((item) => (
              <View key={item.juiceId} style={[styles.orderItem, { borderBottomColor: themeColors.lightGray }]}>
                <Text style={[styles.orderItemText, { color: themeColors.text }]}>{item.name} x {item.quantity}</Text>
                <Text style={[styles.orderItemText, { color: themeColors.text }]}>${(item.quantity * item.priceAtSale).toFixed(2)}</Text>
                <TouchableOpacity onPress={() => handleRemoveItem(item.juiceId)}>
                  <Ionicons name="close-circle" size={24} color={themeColors.red} />
                </TouchableOpacity>
              </View>
            ))
          )}
          <Text style={[styles.totalAmountText, { color: themeColors.text }]}>Total: ${totalAmount.toFixed(2)}</Text>
          <CustomButton
            title="Process Sale"
            onPress={handleProcessSale}
            style={{ backgroundColor: themeColors.primary }}
            disabled={currentOrder.length === 0}
          />
        </View>
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
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  juiceSelectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  juiceSelectionText: {
    fontSize: 16,
    flex: 1,
  },
  addJuiceButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: 'auto',
  },
  addJuiceButtonText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  orderItemText: {
    fontSize: 16,
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessDeniedText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default SalesScreen; // Added default export
