import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WithdrawConfirmation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Bank Account</Text>
        <Text style={styles.value}>monobank</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Number</Text>
        <Text style={styles.value}>972754628400</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Name</Text>
        <Text style={styles.value}>Nweke Chisom</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Withdrawal Amount</Text>
        <Text style={styles.value}>$400</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transaction Fee (2%)</Text>
        <Text style={styles.value}>$8.0</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Withdrawal Amount</Text>
        <Text style={styles.value}>$408</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    color: 'gray',
    fontSize: 16,
    fontFamily:'MonsterMid'
  },
  value: {
    fontSize: 16,
    fontFamily:'MonsterBold'
  },
});

export default WithdrawConfirmation;
