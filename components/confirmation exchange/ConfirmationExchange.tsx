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

const ConfirmationExchange = () => {
  const exchangeData = useAppSelector(state => state.exchange.exchange);
  const marketStoredData = useAppSelector(state => state.market.marketData);
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

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
    <View style={styles.container}>
      {/* You Convert Section */}
      <View style={styles.section}>
        <Text style={styles.label}>You Convert</Text>
        <Text style={styles.amount}>{exchangeData.fromAmount} {exchangeData.selectFrom}</Text>
      </View>

      {/* You Receive Section */}
      <View style={styles.section} >
        <Text style={styles.label}>You Receive</Text>
        <View style={styles.receiveContainer}>
          <View>
            <Text style={styles.quantityText}>Quantity</Text>
            <Text style={styles.label}>{exchangeData.toAmount}</Text>
          </View>
          <Text style={styles.currencyText}>{exchangeData.selectedToCoin}</Text>
        </View>
      </View>

      {/* Order Details Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Order</Text>
        <View style={styles.orderDetails}>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>From</Text>
            <Text style={styles.orderLabel}>{exchangeData.fromAmount} {exchangeData.selectFrom}</Text>
          </View>

          <Separator />
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>To</Text>
            <Text style={styles.orderLabel}>{exchangeData.toAmount} {exchangeData.selectedToCoin}</Text>
          </View>

          <Separator />
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Transaction Fee (0.0%)</Text>
            <Text style={styles.orderLabel}>$0.00</Text>
          </View>

          <Separator />
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Total</Text>
            <Text style={styles.orderLabel}>{exchangeData.toAmount} {exchangeData.selectedToCoin} ${accumulatedPriceUSD}</Text>
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
    color: '#000',
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
    color: '#000',
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
    color: '#888',
    fontFamily: 'MonsterBold',
  },
});

export default ConfirmationExchange;
