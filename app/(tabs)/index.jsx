// app/(tabs)/index.js (DashboardScreen)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { useAuthContext } from '../../hooks/useAuth';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

const DashboardScreen = () => {
  const { user, role, signOut } = useAuthContext();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? 'light'];

  const [dailySummary, setDailySummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    if (role === 'juice_stall_owner' || role === 'super_admin') {
      fetchDailySummary();
    } else {
      setLoadingSummary(false);
    }
  }, [role]);

  const fetchDailySummary = async () => {
    setLoadingSummary(true);
    // Simulate API call to fetch daily summary
    // In a real app, you'd fetch from your Node.js backend: /api/daily_summaries?date=today&ownerId=...
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockSummary = {
          date: new Date().toLocaleDateString(),
          totalSales: 550.75,
          totalExpenses: 120.50,
          netIncome: 430.25,
          savings: 50.00,
          juicesSold: 35,
          customersServed: 20,
        };
        setDailySummary(mockSummary);
        setLoadingSummary(false);
        resolve(true);
      }, 1500);
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Welcome, {user?.username}!</Text>
        <Text style={[styles.subHeader, { color: themeColors.lightText }]}>Role: {role?.replace(/_/g, ' ').toUpperCase()}</Text>

        {role === 'juice_stall_owner' || role === 'super_admin' ? (
          <View style={[styles.card, { backgroundColor: themeColors.white }]}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>Daily Financial Summary</Text>
            {loadingSummary ? (
              <ActivityIndicator size="large" color={themeColors.primary} />
            ) : dailySummary ? (
              <>
                <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Date: {dailySummary.date}</Text>
                <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Total Sales: ${dailySummary.totalSales.toFixed(2)}</Text>
                <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Total Expenses: ${dailySummary.totalExpenses.toFixed(2)}</Text>
                <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Net Income: ${dailySummary.netIncome.toFixed(2)}</Text>
                <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Savings: ${dailySummary.savings.toFixed(2)}</Text>
                <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Juices Sold: {dailySummary.juicesSold}</Text>
                <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Customers Served: {dailySummary.customersServed}</Text>
                <CustomButton title="Refresh Summary" onPress={fetchDailySummary} style={{ backgroundColor: themeColors.secondary }} />
              </>
            ) : (
              <Text style={[styles.summaryText, { color: themeColors.lightText }]}>No summary available for today.</Text>
            )}
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: themeColors.white }]}>
            <Text style={[styles.cardTitle, { color: themeColors.text }]}>Your Juice Journey</Text>
            <Text style={[styles.summaryText, { color: themeColors.lightText }]}>Explore our delicious juices and check your membership status!</Text>
            <Image
              source={{ uri: 'https://placehold.co/200x150/8BC34A/FFFFFF?text=Fresh+Juice' }} // Placeholder juice image
              style={styles.dashboardImage}
            />
          </View>
        )}

        <CustomButton title="Sign Out" onPress={signOut} style={{ backgroundColor: themeColors.red }} />
      </ScrollView>
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
    paddingBottom: 80, // Make space for the tab bar
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 20,
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
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  dashboardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 15,
    resizeMode: 'cover',
  },
});

export default DashboardScreen; // Added default export
