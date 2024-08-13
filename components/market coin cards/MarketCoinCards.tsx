import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const marketData = [
  {
    pair: "SOL/USDT",
    topPrice: "138.32",
    lowPrice: "1.091",
    volume: "55 431 281,69",
    change: "0.72%",
    changePositive: true
  },
  {
    pair: "BTC/USDT",
    topPrice: "31,221.89",
    lowPrice: "1,113",
    volume: "55 431 281,69",
    change: "2.76%",
    changePositive: true
  },
  {
    pair: "ETH/USDT",
    topPrice: "1,801.10",
    lowPrice: "1,515",
    volume: "24 900 280,04",
    change: "-1.02%",
    changePositive: false
  },
  {
    pair: "BNB/USDT",
    topPrice: "690.15",
    lowPrice: "690.15",
    volume: "53 431 281,69",
    change: "2.01%",
    changePositive: true
  },
  {
    pair: "LTC/USDT",
    topPrice: "44.24",
    lowPrice: "42.15",
    volume: "55 431 281,69",
    change: "2.40%",
    changePositive: true
  }
];

const MarketItem = ({ item }) => {
  return (
    <View style={styles.marketItem}>
      <View style={styles.header}>
        <Text style={styles.pair}>{item.pair}</Text>
        <Text
          style={[
            styles.change,
            item.changePositive ? styles.positive : styles.negative
          ]}
        >
          {item.changePositive ? "+" : ""}{item.change}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.priceText}>Top price: {item.topPrice}</Text>
        <Text style={styles.priceText}>Low price: {item.lowPrice}</Text>
      </View>
      <Text style={styles.volumeText}>Vol: {item.volume}</Text>
    </View>
  );
};

const MarketList = () => {
  return (
    <FlatList
      data={marketData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <MarketItem item={item} />}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pair: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  change: {
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  positive: {
    color: '#28a745',
  },
  negative: {
    color: '#dc3545',
  },
  body: {
    marginBottom: 10,
  },
  priceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  volumeText: {
    fontSize: 14,
    color: '#888',
  },
});

export default MarketList;
