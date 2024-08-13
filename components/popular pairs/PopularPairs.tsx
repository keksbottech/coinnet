import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TradingHistory from '../trading history/TradingHistory'
import PopularPairsHeader from '../popular pairs header/PopularPairsHeader'

const PopularPairs = () => {
  return (
    <View>
      <Text className='font-bold text-2xl'>Popular Pairs</Text>
      <PopularPairsHeader data={['BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD']}/>
    </View>
  )
}

export default PopularPairs

const styles = StyleSheet.create({})