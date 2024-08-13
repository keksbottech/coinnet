import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import AntDesign from '@expo/vector-icons/AntDesign';
import Chart from '../trading chart/Chart';
import { LineChart } from 'react-native-chart-kit';
import MarketChart from '../market chart/MarketChart';

const screenWidth:any = Dimensions.get('window')


const marketData = [
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

const SwipeSide = () => {
  return (
    <SwipeListView
    showsVerticalScrollIndicator={false}
    scrollEnabled={true}
      data={marketData}
      renderItem={({item}, rowMap) => (
        <View style={styles.marketItem}>
        <View style={styles.header}>
          <Text style={styles.pair}>{item.pair}</Text>
          <Text style={styles.volumeText}>Vol: {item.volume}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.priceText}>Top price: {item.topPrice}</Text>
          <MarketChart/>
          <Text style={styles.priceText}>Low price: {item.lowPrice}</Text>
        </View>

<View style={{flexDirection:'row', alignItems:'center'}}>
  <Text style={{right:10, fontFamily:'MonsterMid'}}>{item.changeVol}</Text>
        <Text
            style={[
              styles.change,
              item.changePositive ? styles.positive : styles.negative
            ]}
          >
            {item.changePositive ? "+" : ""}{item.change}
          </Text>
        </View>
      </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.rowBack}>
          <TouchableOpacity style={styles.backRightBtn}>
          <AntDesign name="staro" size={24} color="white" />
            <Text style={styles.backTextWhite}>Add to Favorites</Text>
          </TouchableOpacity>
        </View>
      )}
      // leftOpenValue={95}
      rightOpenValue={-105}
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
    height: 80
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    // flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    height:140
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 105,
    backgroundColor: 'orange',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
    // marginTop:10
  },
  container: {
    padding: 10,
  },
  marketItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:140,
    paddingVertical:25
  },
  header: {
    marginBottom: 10,
  },
  pair: {
    fontWeight: 'bold',
    fontSize: 18,
    
    fontFamily:'MonsterBold'
  },
  change: {
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  positive: {
    backgroundColor: '#28a745',
    color:'white',
  },
  negative: {
    backgroundColor: '#dc3545',
    color:'white',
  },
  body: {
    alignItems:'center',
    justifyContent:'center'
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

export default SwipeSide;
