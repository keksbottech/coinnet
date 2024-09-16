import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SupportActionButtons from '@/components/support action buttons/SupportActionButtons';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const LimitsScreen = () => {
  const transactionLimits = useAppSelector(state => state.fiatWallet.fiatWalletBalance)
   const theme = useAppSelector(state => state.theme.theme)

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
<SupportActionButtons/>
        {/* Transaction Limits Section */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Transaction limits</ThemedText>
          <View style={styles.limitContainer}>
            <View style={styles.limitItem}>
              <Text style={styles.limitLabel}>Daily transaction limit</Text>
              <Text style={styles.limitValue}>₦{transactionLimits?.dailyTransactionLimit.limit}</Text>
            </View>
            <View style={styles.limitItem}>
              <Text style={styles.limitLabel}>Transaction amount used</Text>
              <Text style={styles.limitValue}>₦{parseFloat(transactionLimits?.dailyTransactionLimit.amountUsed).toFixed()}</Text>
            </View>
            <View style={styles.limitItem}>
              <Text style={styles.limitLabel}>Maximum amount per transaction</Text>
              <Text style={styles.limitValue}>₦{transactionLimits?.maxTransactionAmount}</Text>
            </View>
            {/* <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil-outline" size={18} color="#00A6FF" />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Authorisation method</Text>
          <View style={styles.authContainer}>
            <View style={styles.authItem}>
              <Text style={styles.authLabel}>Transactions below limit</Text>
              <Text style={styles.authValue}>N/A</Text>
            
            </View>
            <View style={styles.authItem}>
              <Text style={styles.authLabel}>Transactions above limit</Text>
              <Text style={styles.authValue}>N/A</Text>
            </View>
          </View>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
   
    fontSize: 18,
    fontFamily:'MonsterBold',
    marginBottom: 10,
  },
  limitContainer: {
    backgroundColor:'#eee',
    borderRadius: 10,
    padding: 16,
    position: 'relative',
  },
  limitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  limitLabel: {
    color: '#aaa',
    fontSize: 16,
    fontFamily:'MonsterReg'
  },
  limitValue: {
   
    fontSize: 16,
  },
  editButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  authContainer: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 16,
  },
  authItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  authLabel: {
    color: '#aaa',
    fontSize: 16,
    fontFamily:'MonsterReg'
  },
  authValue: {
   
    fontSize: 16,
  },
});

export default LimitsScreen;
