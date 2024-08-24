import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AntDesign from '@expo/vector-icons/AntDesign';
import Chart from '../trading chart/Chart';
import { LineChart } from 'react-native-chart-kit';
import MarketChart from '../market chart/MarketChart';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getFavoriteData } from '@/lib/store/reducers/storeFavorites';


const screenWidth:any = Dimensions.get('window')


const MarketDataSwipeSide = ({marketData}) => {
  const dispatch = useAppDispatch()
  const [favoriteArray, setFavoriteArray] = useState([])

  useEffect(() => {
    console.log(favoriteArray)
    dispatch(getFavoriteData(favoriteArray))  
  }, [favoriteArray])


  const storeMarketDataToFavorites = (item) => {
    setFavoriteArray(prev => [...prev, item])
    console.log(item)
  }

  return (
    <SwipeListView
    showsVerticalScrollIndicator={false}
    scrollEnabled={true}
    contentContainerStyle={{paddingHorizontal:0, borderRadius:10,paddingBottom:250}}
      data={marketData}
      renderItem={({item}) => (
        <View style={styles.marketItem}>
        <View style={styles.header}>
          <Text style={styles.pair}>{item?.symbol}/USD</Text>
          <Text style={styles.volumeText}>Vol:</Text>
          <Text style={styles.volumeText}>{parseFloat(item.volumeUsd24Hr).toFixed(2)}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.priceText}>Top price: {parseFloat(item.priceUsd).toFixed(2)}</Text>
          <MarketChart/>
          <Text style={styles.priceText}>Low price:  {parseFloat(item.priceUsd).toFixed(2)}</Text>
        </View>

<View style={{flexDirection:'row', alignItems:'center'}}>
  <Text style={{right:15, fontFamily:'MonsterMid'}}>{parseFloat(item.vwap24Hr).toFixed(2)}</Text>
        <Text
            style={[
              styles.change,
              item.changePercent24Hr ? styles.positive : styles.negative
            ]}
          >
            {item.changePercent24Hr ? "+" : ""}{parseFloat(item.changePercent24Hr).toFixed(2)}
          </Text>
        </View>
      </View>
      )}
      renderHiddenItem={(data, rowMap) => {
        // console.log(data, 'favorites')

         return(
        <View style={styles.rowBack}>
          <TouchableOpacity style={styles.backRightBtn} onPress={() => storeMarketDataToFavorites(data)}>
          <AntDesign name="staro" size={24} color="white" />
            <Text style={styles.backTextWhite}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
      )}}
      // leftOpenValue={95}
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
    borderRadius:8,
    marginVertical:5
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    // flex: 1,
    justifyContent: 'center',
    // paddingLeft: 15,
    height:140,
    borderRadius:8,
    
    marginVertical:5
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
    borderRadius:8
  },
  backTextWhite: {
    color: '#FFF',
    // marginTop:10
        fontFamily:'MonsterBold'
  },
  container: {
    // padding: 10,
  },
  marketItem: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:140,
    paddingVertical:25,
    marginVertical:5
  },
  header: {
    marginBottom: 10,
    right:10
  },
  pair: {
    fontFamily:'MonsterBold',
    fontSize: 16,
  },
  change: {
    fontSize: 14,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
        fontFamily:'MonsterBold',
right:10
  },
  positive: {
    backgroundColor: '#28a745',
    color:'white',
        fontFamily:'MonsterBold'
  },
  negative: {
    backgroundColor: '#dc3545',
    color:'white',
        fontFamily:'MonsterBold'
  },
  body: {
    alignItems:'center',
    justifyContent:'center',
   right:10
  },
  priceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    
    fontFamily:'MonsterMid'
  },
  volumeText: {
    fontSize: 14,
    color: '#888',
    fontFamily:'MonsterBold'
  },
});

export default MarketDataSwipeSide;
