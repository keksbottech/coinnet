import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getSelectedCoinData } from '@/lib/store/reducers/storeSelectedCoin';

const TradingCurrencySubHeader: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ALL');
  const [showFiatDropdown, setShowFiatDropdown] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const [selectedFiat, setSelectedFiat] = useState<string>('USD');

  const currencies = ['ALL', 'BTC', 'USDC', 'BNB', 'ETH', 'LTC'];
  const fiatCurrencies = ['USD', 'EUR', 'GBP'];

  useEffect(() => {
    dispatch(getSelectedCoinData('ALL'))
  }, [])

  const handleCurrencyPress = (currency: string) => {
    dispatch(getSelectedCoinData(currency))
    console.log(currency)
    if (currency === 'USD') {
      setShowFiatDropdown(!showFiatDropdown);
      setSelectedCurrency(currency);
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
