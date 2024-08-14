import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BitcoinImage from '@/assets/svg/bitcoin.svg'
import { Separator } from 'tamagui';

const SendCoins = () => {
  const [selectedCoin, setSelectedCoin] = useState('Ethereum');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const coins = [
    { name: 'Ethereum', symbol: 'ETH', balance: '0.000686 ETH', icon: 'logo-ethereum' },
    { name: 'Bitcoin', symbol: 'BTC', balance: '2.23464 BTC', icon: 'logo-bitcoin' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Coin</Text>
      <View style={styles.coinSelector}>
        <TouchableOpacity style={styles.coin}>
          <BitcoinImage/>
          <View style={styles.coinText}>
            <Text style={styles.coinName}>{coins[0].name}</Text>
            <Text style={styles.coinBalance}>{coins[0].balance}</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={20} />
        </TouchableOpacity>
        <View style={styles.selectedCoin}>
        <BitcoinImage/>
          <View style={styles.coinText}>
            <Text style={styles.coinName}>{coins[1].name}</Text>
            <Text style={styles.coinBalance}>{coins[1].balance}</Text>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Address</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.input, {flex:1}]}
            onChangeText={setAddress}
            value={address}
            placeholder="Enter wallet address"
          />
          <Ionicons name="qr-code-outline" size={24} style={styles.icon} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAmount}
          value={amount}
          placeholder="Enter amount"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNote}
          value={note}
          placeholder="Add a note"
        />
      </View>

      <Text style={[styles.transactionInfo, {paddingBottom:30}]}>
        Transaction fees: 0.0000 BTC{'\n'}
        Min: 0.0001 BTC - Max: 2.0006 BTC
      </Text>

      <Separator/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  title: {
    fontSize: 18,
     fontFamily:'MonsterBold',
    marginBottom: 20,
  },
  coinSelector: {
    marginBottom: 20,
  },
  coin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  coinText: {
    flex: 1,
    marginLeft: 10,
 fontFamily:'MonsterMid'
  },
  coinName: {
    fontSize: 16,
    fontFamily:'MonsterMid'
  },
  coinBalance: {
    color: 'gray',
        fontFamily:'MonsterMid'
  },
  selectedCoin: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  input: {
  
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
  },
  transactionInfo: {
    marginTop: 20,
    color: 'gray',
    fontSize: 14,
    lineHeight: 20,
        fontFamily:'MonsterMid'
  },
  label:{
        fontFamily:'MonsterMid'
  }
});

export default SendCoins;
