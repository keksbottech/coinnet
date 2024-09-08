import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AntDesign from '@expo/vector-icons/AntDesign';
import MarketChart from '../market chart/MarketChart';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getFavoriteData } from '@/lib/store/reducers/storeFavorites';
import { Image } from 'react-native';
import { ThemedText } from '../ThemedText';

const screenWidth = Dimensions.get('window').width;

interface MarketDataItem {
  pair: string;
  topPrice: string;
  lowPrice: string;
  volume: string;
  change: string;
  changePositive: boolean;
  changeVol: string;
}

interface FavoriteDataItem {
  item: {
    symbol: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    vwap24Hr: string;
    changePercent24Hr: string;
  };
}

const initialMarketData: MarketDataItem[] = [
  {
    pair: "SOL/USDT",
    topPrice: "138.32",
    lowPrice: "1.091",
    volume: "55 431 281,69",
    change: "0.72%",
    changePositive: true,
    changeVol: "0.06",
  },
  {
    pair: "BTC/USDT",
    topPrice: "31,221.89",
    lowPrice: "1,113",
    volume: "55 431 281,69",
    change: "2.76%",
    changePositive: true,
    changeVol: "0.06",
  },
  {
    pair: "ETH/USDT",
    topPrice: "1,801.10",
    lowPrice: "1,515",
    volume: "24 900 280,04",
    change: "-1.02%",
    changePositive: false,
    changeVol: "0.06",
  },
  {
    pair: "BNB/USDT",
    topPrice: "690.15",
    lowPrice: "690.15",
    volume: "53 431 281,69",
    change: "2.01%",
    changePositive: true,
    changeVol: "0.06",
  },
  {
    pair: "LTC/USDT",
    topPrice: "44.24",
    lowPrice: "42.15",
    volume: "55 431 281,69",
    change: "2.40%",
    changePositive: true,
    changeVol: "0.06",
  }
];

const FavoritesCoinCards: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketDataItem[]>(initialMarketData);
  const favoriteData = useAppSelector(state => state.favorite.favorites as FavoriteDataItem[]);
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme.theme)

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newMarketData = [...marketData];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newMarketData.length) {
      const [movedItem] = newMarketData.splice(index, 1);
      newMarketData.splice(targetIndex, 0, movedItem);
      setMarketData(newMarketData);
    }
  };

  const removeItem = (index: number) => {
    const favoriteArray = [...favoriteData];
    favoriteArray.splice(index, 1);
    dispatch(getFavoriteData(favoriteArray));
  };

  console.log(favoriteData)
  

  return (
    <SwipeListView
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      contentContainerStyle={{ paddingHorizontal: 0, borderRadius: 10, paddingBottom: 250 }}
      data={favoriteData}
      renderItem={({ item }, rowMap) => {
  
        return (
          <View style={[styles.marketItem, {backgroundColor:theme ? 'gray': 'white'}]}>
            <View style={styles.header}>
            <Image
            source={{ uri: `https://cryptocompare.com${item.CoinInfo.ImageUrl}` }}
            style={{ width: 40, height: 40 }}
          />

              <ThemedText style={styles.pair}>{item.CoinInfo.Name}/USD</ThemedText>
              <ThemedText style={styles.volumeText}>Vol:</ThemedText>
              <ThemedText style={styles.volumeText}>{item.DISPLAY?.USD.VOLUME24HOUR}</ThemedText>
            </View>
            <View style={styles.body}>
              <ThemedText style={styles.priceText}>Top price:  {item.DISPLAY?.USD?.HIGH24HOUR}</ThemedText>
              <MarketChart />
              <ThemedText style={styles.priceText}>Low price: {item?.DISPLAY?.USD?.LOW24HOUR}</ThemedText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ThemedText style={{ right: 15, fontFamily: 'MonsterMid' }}>{item?.DISPLAY?.USD?.LOW24HOUR}</ThemedText>
              <ThemedText
                style={[
                  styles.change,
                  parseFloat(item.DISPLAY?.USD?.CHANGEPCT24HOUR) > 0 ? styles.positive : styles.negative,
                ]}
              >
                        {`${parseFloat(item.DISPLAY?.USD.CHANGEPCT24HOUR) > 0 ? '+' : ''}${parseFloat(item?.DISPLAY?.USD.CHANGEPCT24HOUR).toFixed(2)}%`}
              </ThemedText>
            </View>
          </View>
        );
      }}
      renderHiddenItem={({ item, index }, rowMap) => (
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.moveBtn]}
            onPress={() => moveItem(index, 'up')}
          >
            <AntDesign name="up" size={24} color="white" />
            <ThemedText style={styles.backTextWhite}>Move Up</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.removeBtn]}
            onPress={() => removeItem(index)}
          >
            <AntDesign name="delete" size={24} color="white" />
            <ThemedText style={styles.backTextWhite}>Remove</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.moveBtn]}
            onPress={() => moveItem(index, 'down')}
          >
            <AntDesign name="down" size={24} color="white" />
            <ThemedText style={styles.backTextWhite}>Move Down</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-270}
    />
  );
};

const styles = StyleSheet.create({
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 135,
    borderRadius: 8,
    marginVertical: 5
  },
  rowBack: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    height: 140,
    borderRadius: 8,
    marginVertical: 5
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 90,
    borderRadius: 8
  },
  moveBtn: {
    backgroundColor: 'green',
    marginLeft: 110,
    width: 130
  },
  removeBtn: {
    backgroundColor: 'red',
    marginLeft: 240,
    width: 130
  },
  backTextWhite: {
    color: '#FFF',
    fontFamily: 'MonsterBold',
  },
  container: {
    // padding: 10,
  },
  marketItem: {
    // backgroundColor: '#fff',
    padding: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 140,
    paddingVertical: 25,
    marginVertical: 5
  },
  header: {
    marginBottom: 10,
    right: 10
  },
  pair: {
    fontFamily: 'MonsterBold',
    fontSize: 16,
  },
  change: {
    fontSize: 14,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontFamily: 'MonsterBold',
    right: 10
  },
  positive: {
    backgroundColor: '#28a745',
    color: 'white',
    fontFamily: 'MonsterBold'
  },
  negative: {
    backgroundColor: '#dc3545',
    color: 'white',
    fontFamily: 'MonsterBold'
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 10
  },
  priceText: {
    fontSize: 14,
    // color: '#333',
    marginBottom: 5,
    fontFamily: 'MonsterMid'
  },
  volumeText: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'MonsterBold'
  },
});

export default FavoritesCoinCards;
