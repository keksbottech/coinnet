import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Separator } from 'tamagui';
import { ThemedText } from '../ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';

const MarketSubHeaderPairsTabs = () => {
  const theme = useAppSelector(state => state.theme.theme)

  return (
    <View style={[styles.headerContainer,{backgroundColor:theme ? 'rgba(255,255,255,.1)': 'white'}]}>
      <View style={styles.column}>
        <ThemedText style={styles.headerText}>Pair</ThemedText>
        <ThemedText style={styles.headerText}>USDT</ThemedText>
      </View>
      <View style={styles.row}>
        <View style={styles.column}>
          <ThemedText style={styles.headerText}>Last</ThemedText>
          <ThemedText style={styles.headerText}>Price</ThemedText>
        </View>
        <View style={[styles.column, styles.marginLeft]}>
          <ThemedText style={styles.headerText}>24H</ThemedText>
          <ThemedText style={styles.headerText}>Change</ThemedText>
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
    fontFamily: 'MonsterBold',
  },
  marginLeft: {
    marginLeft: 15,
  },
});

export default MarketSubHeaderPairsTabs;
