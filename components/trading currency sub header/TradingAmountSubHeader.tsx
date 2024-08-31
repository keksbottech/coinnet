import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getSelectedCoinData } from '@/lib/store/reducers/storeSelectedCoin';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const FilterOptions: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>('Amount');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Select');

  const amountOptions = ['Amount', '1', '10', '100', '1000']; // Add more options as needed
  const paymentMethods = ['Bank Transfer', 'PayPal']; // Add more options as needed
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(selectedPaymentMethod)
    dispatch(getSelectedCoinData(selectedPaymentMethod))
  }, [selectedPaymentMethod])


  return (
    <View style={styles.container}>
      {/* Amount Dropdown */}
      {/* <View style={styles.pickerContainer}>

        <Picker
          selectedValue={selectedAmount}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedAmount(itemValue as string)}
        >
          {amountOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View> */}

      {/* Payment Methods Dropdown */}
      <View style={styles.pickerContainer}>

        <Picker
          selectedValue={selectedPaymentMethod}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue as string)}
        >
          {paymentMethods.map((method) => (
            <Picker.Item key={method} style={{fontFamily:'MonsterReg'}} label={method} value={method} />
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
    fontFamily:'MonsterReg'
  },
  picker: {
    flex: 1,
    height: 40,
       fontFamily:'MonsterReg'
  },
});

export default FilterOptions;
