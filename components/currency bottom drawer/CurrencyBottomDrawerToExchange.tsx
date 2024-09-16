import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import BottomDrawer from '../bottom drawer/BottomDrawer';
import { getSelectedCurrencyData, getSelectedCurrencyToData } from '@/lib/store/reducers/storeSelectedCurrency';


const currency = [
    { id: 1, name: 'Nigerian Naira', symbol: 'NGN', imageUrl: `https://flagsapi.com/NG/shiny/64.png`, balance:0 },
    { id: 2, name: 'American Dollars', symbol: 'USD', imageUrl: `https://flagsapi.com/US/shiny/64.png`, balance:0 },
    { id: 3, name: 'Ghanian Cedis', symbol: 'GHS', imageUrl: `https://flagsapi.com/GH/shiny/64.png`, balance:0 },
    { id: 4, name: 'South Africa Rand', symbol: 'ZAR', imageUrl: `https://flagsapi.com/ZA/shiny/64.png`, balance:0 },
    { id: 5, name: 'European Euro', symbol: 'EUR', imageUrl: `https://flagsapi.com/ES/shiny/64.png`, balance:0 },
  ];


const CurrencyBottomDrawerToExchange = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currency[3]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSelectedCurrencyToData(selectedCurrency));
    // setDisableDrawer(!disableDrawer);
  }, [selectedCurrency]);

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
  };
  

  return (
    <BottomDrawer
    enablePanDownToClose={true}
    ui={
    <View style={styles.container}>
      <Text style={styles.title}>Currencies</Text>
      {
        currency?.map(item =>  <TouchableOpacity 
            key={item.id}
            style={[styles.currencyItem, selectedCurrency?.id === item.id && styles.selectedItem]} 
            onPress={() => handleSelectCurrency(item)}
          >
            <View style={styles.currencyInfo}>
              <Image source={{uri:item.imageUrl}} width={50} height={50}/>
              <Text style={styles.currencyText}>{item.name}</Text>
            </View>
            <View style={styles.currencyValue}>
              <Text style={styles.currencyAmount}>{item.symbol}{item.balance}</Text>
              <Ionicons 
                name={selectedCurrency?.id === item.id ? 'radio-button-on' : 'radio-button-off'} 
                size={24} 
                color={selectedCurrency?.id === item.id ? '#00aaff' : '#fff'} 
              />
            </View>
          </TouchableOpacity>)  
      }
    </View>
    }/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontFamily: 'MonsterBold',
    marginBottom: 20,
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: '#00aaff',
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  currencyText: {
    fontSize: 18,
    fontFamily:'MonsterReg',
    left:10
  },
  currencyValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyAmount: {
    marginRight: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  addText: {
    color: '#00aaff',
    marginLeft: 10,
  },
});

export default CurrencyBottomDrawerToExchange;
