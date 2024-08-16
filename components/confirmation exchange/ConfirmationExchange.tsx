import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Separator } from 'tamagui';

const ConfirmationExchange = () => {
  const [quantity, setQuantity] = useState('0.689612');

  return (
    <View style={styles.container}>
      {/* You Convert Section */}
      <View style={styles.section}>
        <Text style={styles.label} className='text-center font-bold'>You Convert</Text>
        <Text style={styles.amount} className='text-center font-bold'>$1,000</Text>
      </View>

      {/* You Receive Section */}
      <View style={styles.section} className='pt-10'>
        <Text style={styles.label} className='font-bold'>You Receive</Text>
        <View style={styles.receiveContainer}>
          <View>
          <Text style={styles.quantityText}>Quantity</Text>
         <Text>0.478940</Text>
         </View>
          <Text style={styles.currencyText} className='font-bold'>ETH</Text>
        </View>
      </View>

      {/* Order Details Section */}
      <View style={styles.section}>
        <Text style={styles.label} className='font-bold'>Order</Text>
        <View style={styles.orderDetails}>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>From</Text>
            <Text>Bitcoin 0.040141 BTC</Text>
          </View>

          <Separator/>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>To</Text>
            <Text>Ethereum 0.689612 ETH</Text>
          </View>
          
          <Separator/>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Transaction Fee (0.0%)</Text>
            <Text>$0.0</Text>
          </View>
          
          <Separator/>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Total</Text>
            <Text>0.040141 BTC $1001</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
     marginBottom: 5,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  receiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    justifyContent:'space-between'
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  currencyText: {
    fontSize: 18,
    color: '#000',
  },
  orderDetails: {
    padding: 10,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:20
  },
  orderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
});

export default ConfirmationExchange;
