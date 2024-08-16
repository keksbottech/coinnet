import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BitcoinImage from '@/assets/svg/bitcoin.svg';

const SellCoinForm = () => {
  const [selectedCoin, setSelectedCoin] = useState('eth');
  const [selectedLimit, setSelectedLimit] = useState('limit1');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Select Coin */}
          <Text style={styles.label}>Select Coin</Text>
          <View style={styles.inputWrapper}>
            <BitcoinImage />
            <Picker
              selectedValue={selectedCoin}
              onValueChange={(itemValue) => setSelectedCoin(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="ETH" value="eth" />
              <Picker.Item label="BTC" value="btc" />
              <Picker.Item label="USDT" value="usdt" />
            </Picker>
          </View>

          {/* Limits */}
          <Text style={styles.label}>Limits</Text>
          <View style={styles.inputWrapper}>
            <BitcoinImage />
            <Picker
              selectedValue={selectedLimit}
              onValueChange={(itemValue) => setSelectedLimit(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="1,000 - 1,700" value="limit1" />
              <Picker.Item label="1,700 - 2,500" value="limit2" />
            </Picker>
          </View>

          {/* Quantity */}
          <Text style={styles.label}>Quantity</Text>
          <View style={styles.inputWrapper}>
            <BitcoinImage />
            <TextInput
              style={styles.input}
              placeholder="0.023554"
              keyboardType="numeric"
            />
          </View>

          {/* You Sell */}
          <Text style={styles.label}>You Sell</Text>
          <View style={styles.inputWrapper}>
            <BitcoinImage />
            <TextInput
              style={styles.input}
              placeholder="$1,000"
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'MonsterBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  picker: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'MonsterReg',
  },
});

export default SellCoinForm;
