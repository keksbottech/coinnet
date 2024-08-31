import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import BitcoinImage from '@/assets/svg/bitcoin.svg'

const screenWidth = Dimensions.get('window').width;

type PortfolioTypes = {
  style?: {},
  priceUsd: string,
  name: string,
  symbol:string,
  changePercent24Hr: any;
  image:string
}
const Portfolio = ({style, name, symbol, image ='', priceUsd, changePercent24Hr}:PortfolioTypes) => {
  return (
    <View style={[styles.container, style]}>
        <View style={styles.leftSection}>
        <Image source={{uri:`https://cryptocompare.com${image}`}} width={50} height={50}/>
          <View style={styles.textContainer}>
            <Text style={styles.cryptoName} >{name}</Text>
            <Text style={styles.cryptoSymbol}>{symbol}</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.price}>{priceUsd}</Text>
          <Text style={[{ color: changePercent24Hr > 0 ? 'green' : 'red' }, {fontFamily:'MonsterBold'}]}>
                    {`${changePercent24Hr > 0 ? '+' : ''}${changePercent24Hr.toFixed(2)}%`}
                  </Text>
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
    fontSize: 17,
    fontFamily:'MonsterBold',
    color: '#333',
  },
  cryptoSymbol: {
    fontSize: 14,
    color: '#666',
      fontFamily:'MonsterReg'
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    color: '#333',
      fontFamily:'MonsterBold'
  },
  change: {
    fontSize: 14,
      fontFamily:'MonsterReg',
    color: '#4CAF50', // Green color for positive change
  },
});

export default Portfolio;
