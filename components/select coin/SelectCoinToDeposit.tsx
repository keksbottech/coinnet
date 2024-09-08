import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getSelectedCoinData } from '@/lib/store/reducers/storeSelectedCoin';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '../ThemedText';

const SelectCoinsToDepositDrawer = () => {
  const marketStoredData = useAppSelector(state => state.market.marketData)

  
  const btcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BTC');
  const ethData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'ETH');
  const usdCData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'USDC');
  const bnbData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BNB');
  const solData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'SOL');

  const coins = [
    { id: 1, name: 'Bitcoin', symbol: 'BTC', imageUrl: `https://www.cryptocompare.com${btcData.CoinInfo.ImageUrl}` },
    { id: 2, name: 'Ethereum', symbol: 'ETH', imageUrl: `https://www.cryptocompare.com${ethData.CoinInfo.ImageUrl}` },
    { id: 3, name: 'USD Coin', symbol: 'USDC', imageUrl: `https://www.cryptocompare.com${usdCData.CoinInfo.ImageUrl}` },
    { id: 4, name: 'Binance Coin', symbol: 'BNB', imageUrl: `https://www.cryptocompare.com${bnbData.CoinInfo.ImageUrl}` },
    { id: 5, name: 'Solana', symbol: 'SOL', imageUrl: `https://www.cryptocompare.com${solData.CoinInfo.ImageUrl}` },
  ];

  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [disableDrawer, setDisableDrawer] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSelectedCoinData(selectedMethod));
    setDisableDrawer(!disableDrawer);
  }, [selectedMethod]);

  return (
    <BottomDrawer
      enablePanDownToClose={false}
      ui={
        <View style={styles.container}>
          <ThemedText style={styles.title}>Choose Coin</ThemedText>
          {coins.map(method => (
            <TouchableOpacity
              key={method.id}
              style={styles.methodContainer}
              onPress={() => setSelectedMethod({ name: method.name, symbol: method.symbol })}
            >
              <View style={styles.methodDetails}>
                <Image source={{ uri: method.imageUrl }} style={styles.icon} />
                <View style={{ marginLeft: 10 }}>
                  <ThemedText style={styles.methodName}>{method.name}</ThemedText>
                </View>
              </View>
              {selectedMethod?.name === method.name && (
                <MaterialIcons name="check-circle" size={24} color="green" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      }
    />
  );
};

export default SelectCoinsToDepositDrawer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  methodName: {
    fontSize: 16,
    fontFamily: 'MonsterBold',
  },
});
