import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FilterOptions: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>('Amount');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('All Payment Methods');

  const amountOptions = ['Amount', '1', '10', '100', '1000']; // Add more options as needed
  const paymentMethods = ['All Payment Methods', 'Credit Card', 'Bank Transfer', 'PayPal']; // Add more options as needed

  return (
    <View style={styles.container}>
      {/* Amount Dropdown */}
      <View style={styles.pickerContainer}>

        <Picker
          selectedValue={selectedAmount}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedAmount(itemValue as string)}
        >
          {amountOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>

      {/* Payment Methods Dropdown */}
      <View style={styles.pickerContainer}>

        <Picker
          selectedValue={selectedPaymentMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue as string)}
        >
          {paymentMethods.map((method) => (
            <Picker.Item key={method} label={method} value={method} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
    width:300
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  picker: {
    flex: 1,
    height: 40,
  },
});

export default FilterOptions;
