import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TradingHistory from '../trading history/TradingHistory'
import PopularPairsHeader from '../popular pairs header/PopularPairsHeader'

const PopularPairs = () => {

  const changePairType = () => {}
  return (
    <View>
      <Text style={styles.text}>Popular Pairs</Text>

      <PopularPairsHeader data={['BTC/USD', 'ETH/USD', 'SOL/USD', 'USDC/USD']}/>
    </View>
  )
}

export default PopularPairs

const styles = StyleSheet.create({
  text:{
    fontFamily:'MonsterBold',
    fontSize:18
  }
})