import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const TradingCurrencySubHeader: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USDT');
  const [showFiatDropdown, setShowFiatDropdown] = useState<boolean>(false);
  const [selectedFiat, setSelectedFiat] = useState<string>('USD');

  const currencies = ['USDT', 'USDC', 'BTC', 'Litecoin', 'Tron', 'USD'];
  const fiatCurrencies = ['USD', 'EUR', 'GBP'];

  const handleCurrencyPress = (currency: string) => {
    if (currency === 'USD') {
      setShowFiatDropdown(!showFiatDropdown);
    } else {
      setSelectedCurrency(currency);
      setShowFiatDropdown(false);
    }
  };

  return (
    <View style={styles.row}>
      {currencies.map((currency) => (
        <TouchableOpacity
          key={currency}
          style={[styles.tab, selectedCurrency === currency ? styles.activeTab : null]}
          onPress={() => handleCurrencyPress(currency)}
        >
          <Text style={[styles.tabText, selectedCurrency === currency ? styles.activeTabText : null]}>
            {currency}
            {currency === 'USD' && <Ionicons name="chevron-down-outline" size={16} color={selectedCurrency === currency ? '#000' : '#555'} />}
          </Text>
        </TouchableOpacity>
      ))}
      {showFiatDropdown && (
        <Picker
          selectedValue={selectedFiat}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedFiat(itemValue as string);
            setSelectedCurrency('USD');
            setShowFiatDropdown(false);
          }}
        >
          {fiatCurrencies.map((fiat) => (
            <Picker.Item key={fiat} label={fiat} value={fiat} />
          ))}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  tabText: {
    color: '#555',
    fontSize: 16,
    fontFamily:'MonsterReg'
  },
  activeTabText: {
    color: '#000',
    fontFamily:'MonsterBold'
  },
  picker: {
    position: 'absolute',
    top: 40,
    width: 150,
  },
});

export default TradingCurrencySubHeader;
