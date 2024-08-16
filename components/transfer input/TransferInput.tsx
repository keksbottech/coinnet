import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TransferInput = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input} placeholder="NGN" />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} />
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default TransferInput;
