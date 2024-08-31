import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ListRenderItemInfo, RefreshControl, Image } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AntDesign from '@expo/vector-icons/AntDesign';
import MarketChart from '../market chart/MarketChart';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getFavoriteData } from '@/lib/store/reducers/storeFavorites';
import { useAppSelector } from '@/hooks/useAppSelector';

// Define the types for props and data
interface MarketData {
  symbol: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
}

interface MarketDataSwipeSideProps {
  marketData: MarketData[];
  fetchData: () => Promise<void>;
}

const screenWidth = Dimensions.get('window').width;

const MarketDataSwipeSide: React.FC<MarketDataSwipeSideProps> = ({ fetchData }) => {
  const dispatch = useAppDispatch();
  const [favoriteArray, setFavoriteArray] = useState<MarketData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const marketData = useAppSelector(state => state.market.marketData)

  useEffect(() => {
    console.log(favoriteArray);
    dispatch(getFavoriteData(favoriteArray));
  }, [favoriteArray]);

  const storeMarketDataToFavorites = (item: MarketData) => {
    setFavoriteArray((prev) => [...prev, item]);
    console.log(item);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchData()]);
    setRefreshing(false);
  };

  return (
    <SwipeListView
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingHorizontal: 0, borderRadius: 10, paddingBottom: 250 }}
      data={marketData}
      renderItem={({ item }: ListRenderItemInfo<MarketData>) => (
        <View style={styles.marketItem}>
          <View style={styles.header}>
            <View>
          <Image
            source={{ uri: `https://cryptocompare.com${item.CoinInfo.ImageUrl}` }}
            style={{ width: 40, height: 40 }}
          />
            <Text style={styles.pair}>{item.CoinInfo.Name}/USD</Text>
            </View>
            <Text style={styles.volumeText}>Vol:</Text>
            <Text style={styles.volumeText}>{item.DISPLAY?.USD.VOLUME24HOUR}</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.priceText}>Top price: {item.DISPLAY?.USD?.HIGH24HOUR}</Text>
            <MarketChart />
            <Text style={styles.priceText}>Low price: {item?.DISPLAY?.USD?.LOW24HOUR}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ right: 15, fontFamily: 'MonsterMid' }}>{item?.DISPLAY?.USD?.LOW24HOUR}</Text>
            <Text
              style={[
                styles.change,
                parseFloat(item.DISPLAY?.USD?.CHANGEPCT24HOUR) > 0 ? styles.positive : styles.negative,
              ]}
            >
              {`${parseFloat(item.DISPLAY?.USD.CHANGEPCT24HOUR) > 0 ? '+' : ''}${parseFloat(item?.DISPLAY?.USD.CHANGEPCT24HOUR).toFixed(2)}%`}
            </Text>
          </View>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.rowBack}>
          <TouchableOpacity style={styles.backRightBtn} onPress={() => storeMarketDataToFavorites(data.item)}>
            <AntDesign name="staro" size={24} color="white" />
            <Text style={styles.backTextWhite}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
      )}
      rightOpenValue={-135}
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
    height: 80,
    borderRadius: 8,
    marginVertical: 5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    justifyContent: 'center',
    height: 140,
    borderRadius: 8,
    marginVertical: 5,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 135,
    backgroundColor: 'orange',
    right: 0,
    borderRadius: 8,
  },
  backTextWhite: {
    color: '#FFF',
    fontFamily: 'MonsterBold',
  },
  container: {},
  marketItem: {
    backgroundColor: '#fff',
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
    marginVertical: 5,
  },
  header: {
    marginBottom: 10,
    right: 10,
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
    right: 10,
  },
  positive: {
    backgroundColor: '#28a745',
    color: 'white',
    fontFamily: 'MonsterBold',
  },
  negative: {
    backgroundColor: '#dc3545',
    color: 'white',
    fontFamily: 'MonsterBold',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
  },
  priceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'MonsterMid',
  },
  volumeText: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'MonsterBold',
  },
});

export default MarketDataSwipeSide;
