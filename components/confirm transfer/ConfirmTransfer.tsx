import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConfirmTransfer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Bank Account</Text>
        <Text style={styles.value}>Coinnet</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Number</Text>
        <Text style={styles.value}>972754628400</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Name</Text>
        <Text style={styles.value}>Nweke chisom</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Withdrawal Amount</Text>
        <Text style={[styles.value, styles.bold]}>₦7,400</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transaction Fee (2%)</Text>
        <Text style={styles.value}>28.0</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Transfer</Text>
        <Text style={[styles.value, styles.bold]}>₦7,680</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ConfirmTransfer;
