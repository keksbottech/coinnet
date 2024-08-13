import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import BitcoinImage from '@/assets/svg/bitcoin.svg'


const ConvertForm = () => {
  const [selectedFromCoin, setSelectedFromCoin] = useState('bitcoin');
  const [selectedToCoin, setSelectedToCoin] = useState('ethereum');

  return (
    <View style={styles.container}>
      {/* You Convert */}
      <Text style={styles.label} className='text-center'>You Convert</Text>
      <Text style={styles.amountText} className='text-center'>$1,000</Text>

      {/* You Receive */}
      <Text style={styles.label}>You Receive</Text>
      <View style={styles.receiveContainer}>
        <Text style={styles.quantityText}>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder="0.689612"
          keyboardType="numeric"
        />
        <Text style={styles.currencyText}>ETH</Text>
      </View>

      {/* Exchange */}
      <Text style={styles.label}>Exchange</Text>
      <View style={styles.exchangeContainer}>
        <View style={styles.coinWrapper}>
          <BitcoinImage/>
          <View>
          <Text style={styles.coinText}>From</Text>
          <Text style={styles.coinName}>Bitcoin</Text>
        </View>
        </View>
        <TouchableOpacity style={styles.exchangeIconWrapper}>
          <Icon name="exchange" size={18} color="#000" />
        </TouchableOpacity>
        <View style={styles.coinWrapper}>
          <View className='flex items-end justify-end' style={{alignItems:'flex-end'}}>
          <Text style={styles.coinText} className='text-right'>To</Text>
          <Text style={styles.coinName}>Ethereum</Text>
          </View>
          <BitcoinImage/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  amountText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },
  receiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  exchangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  coinWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  coinText: {
    fontSize: 14,
    color: '#555',
    marginRight: 5,
  },
  coinName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exchangeIconWrapper: {
    padding: 10,
    borderWidth:.5,
    borderColor:'black',
    borderRadius:10
  },
});

export default ConvertForm;
