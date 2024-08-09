import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Select from '../select/Select'
import Button from '../ui/button/Button'

const SellCoins = () => {
  return (
    <View>
      <View>
        <Text> Select Coin</Text>
        <Select/>
      </View>

      <View>
        <Text> Limits</Text>
        <Select/>
      </View>

      <View>
        <Text> Quantity</Text>
        <Select/>
      </View>

      <View>
        <Text> You sell</Text>
        <Select/>
      </View>

      <Button label='Sell'/>
    </View>
  )
}

export default SellCoins

const styles = StyleSheet.create({})