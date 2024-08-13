import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Separator } from 'tamagui';

const MarketSubHeaderPairsTabs = () => {
  return (
    <>
        <View style={styles.headerContainer}>
      <View style={styles.column}>
        <Text style={styles.headerText}>Pair</Text>
        <Text style={styles.headerText}>USDT</Text>
      </View>
      <View className='flex items-center justify-center flex-row'>
      <View style={styles.column}>
        <Text style={styles.headerText}>Last</Text>
        <Text style={styles.headerText}>Price</Text>
      </View>
      <View style={[styles.column, {marginLeft:15}]}>
        <Text style={styles.headerText}>24H </Text>
        <Text style={styles.headerText}>Change </Text>
      </View>
      </View>
    </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: .5,
    borderBottomColor: 'black',
    justifyContent:'space-between',
  },
  column: {

  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  subText: {
    fontSize: 10,
    color: '#888888',
  },
});

export default MarketSubHeaderPairsTabs;
