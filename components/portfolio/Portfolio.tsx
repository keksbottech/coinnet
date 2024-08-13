import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import BitcoinImage from '@/assets/svg/bitcoin.svg'

const screenWidth = Dimensions.get('window').width;

type PortfolioTypes = {
  style?: {}
}
const Portfolio = ({style}:PortfolioTypes) => {
  return (
    <View style={[styles.container, style]}>
        <View style={styles.leftSection}>
          <BitcoinImage/>
          <View style={styles.textContainer}>
            <Text style={styles.cryptoName} >Bitcoin</Text>
            <Text style={styles.cryptoSymbol}>BTC</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.price}>$1,270.10</Text>
          <Text style={styles.change}>+2.76%</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
 // Adjust width to fit most screens
 width:'100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    paddingVertical:20,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft:10
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cryptoSymbol: {
    fontSize: 14,
    color: '#666',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  change: {
    fontSize: 14,
    color: '#4CAF50', // Green color for positive change
  },
});

export default Portfolio;
