import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

const ConfirmTransfer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Bank Account</ThemedText>
        <ThemedText style={styles.value}>Coinnet</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Account Number</ThemedText>
        <ThemedText style={styles.value}>972754628400</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Account Name</ThemedText>
        <ThemedText style={styles.value}>Nweke chisom</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Withdrawal Amount</ThemedText>
        <ThemedText style={[styles.value, styles.bold]}>₦7,400</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Transaction Fee (2%)</ThemedText>
        <ThemedText style={styles.value}>28.0</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Total Transfer</ThemedText>
        <ThemedText style={[styles.value, styles.bold]}>₦7,680</ThemedText>
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
