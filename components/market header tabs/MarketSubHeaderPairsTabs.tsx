import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Separator } from 'tamagui';

const MarketSubHeaderPairsTabs = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.column}>
        <Text style={styles.headerText}>Pair</Text>
        <Text style={styles.headerText}>USDT</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.headerText}>Last</Text>
          <Text style={styles.headerText}>Price</Text>
        </View>
        <View style={[styles.column, styles.marginLeft]}>
          <Text style={styles.headerText}>24H</Text>
          <Text style={styles.headerText}>Change</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'MonsterBold',
  },
  marginLeft: {
    marginLeft: 15,
  },
});

export default MarketSubHeaderPairsTabs;
