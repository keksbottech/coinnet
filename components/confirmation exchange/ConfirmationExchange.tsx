import { useAppSelector } from '@/hooks/useAppSelector';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Separator } from 'tamagui';
import Loading from '../loading/Loading';
import Button from '../ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getauthenticationInfo } from '@/lib/store/reducers/storeAuthenticationInfo';
import { getTransactionData } from '@/lib/store/reducers/storeTransactionAuthentication';
import { ThemedText } from '../ThemedText';

const ConfirmationExchange = () => {
  const exchangeData = useAppSelector(state => state.exchange.exchange);
  const marketStoredData = useAppSelector(state => state.market.marketData);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)

  // Ensure exchangeData and marketStoredData are defined
  const fromCoinName = exchangeData.selectFrom ? exchangeData.selectFrom.toLowerCase() : '';
  const toCoinName = exchangeData.selectedFrom ? exchangeData.selectedTo.toLowerCase() : '';

  // Find coin data based on names
  const fromCoinData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name.toLowerCase() === fromCoinName);
  const toCoinData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name.toLowerCase() === toCoinName);

  // Calculate the accumulated price in USD
  const accumulatedPriceUSD = fromCoinData && toCoinData 
    ? (parseFloat(exchangeData.toAmount) * toCoinData.RAW.USD.PRICE).toFixed(2)
    : '0.00';


    const navigateToAuthenticationCode = () => {
      dispatch(getTransactionData('exchange'))
      router.navigate('/(trade)/transactionauthenticationcode')
  }
  return (
    <>
    {/* {isLoading && <Loading/>} */}
    <View style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      {/* You Convert Section */}
      <View style={styles.section}>
        <ThemedText style={styles.label}>You Convert</ThemedText>
        <ThemedText style={styles.amount}>{exchangeData.fromAmount} {exchangeData.selectFrom}</ThemedText>
      </View>

      {/* You Receive Section */}
      <View style={styles.section} >
        <ThemedText style={styles.label}>You Receive</ThemedText>
        <View style={styles.receiveContainer}>
          <View>
            <ThemedText style={styles.quantityText}>Quantity</ThemedText>
            <ThemedText style={styles.label}>{exchangeData.toAmount}</ThemedText>
          </View>
          <ThemedText style={styles.currencyText}>{exchangeData.selectedToCoin}</ThemedText>
        </View>
      </View>

      {/* Order Details Section */}
      <View style={styles.section}>
        <ThemedText style={styles.label}>Order</ThemedText>
        <View style={styles.orderDetails}>
          <View style={styles.orderRow}>
            <ThemedText style={styles.orderLabel}>From</ThemedText>
            <ThemedText style={styles.orderLabel}>{exchangeData.fromAmount} {exchangeData.selectFrom}</ThemedText>
          </View>

          <Separator />
          <View style={styles.orderRow}>
            <ThemedText style={styles.orderLabel}>To</ThemedText>
            <ThemedText style={styles.orderLabel}>{exchangeData.toAmount} {exchangeData.selectTo}</ThemedText>
          </View>

          <Separator />
          <View style={styles.orderRow}>
            <ThemedText style={styles.orderLabel}>Transaction Fee (0.0%)</ThemedText>
            <ThemedText style={styles.orderLabel}>$0.00</ThemedText>
          </View>

          <Separator />
          <View style={styles.orderRow}>
            <ThemedText style={styles.orderLabel}>Total</ThemedText>
            <ThemedText style={styles.orderLabel}>{exchangeData.toAmount} {exchangeData.selectedToCoin} ${accumulatedPriceUSD}</ThemedText>
          </View>
        </View>

      </View>
      
      <Button onClick={navigateToAuthenticationCode} styles={{bottom:50}} label='Confirm Exchange'/>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    paddingTop:10
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: 'MonsterReg',
    alignItems:'center'
  },
  amount: {
    fontSize: 36,
    fontFamily: 'MonsterBold',
    // color: '#000',
    alignItems:'center'
  },
  receiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-between',
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
    fontFamily: 'MonsterBold',
  },
  currencyText: {
    fontSize: 18,
    // color: '#000',
    fontFamily: 'MonsterReg',
  },
  orderDetails: {
    padding: 10,
    fontFamily: 'MonsterReg',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  orderLabel: {
    fontSize: 16,
    // color: '#888',
    fontFamily: 'MonsterBold',
  },
});

export default ConfirmationExchange;
