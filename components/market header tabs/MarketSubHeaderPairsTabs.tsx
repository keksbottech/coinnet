import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Separator } from 'tamagui'

const MarketSubHeaderPairsTabs = () => {
  return (
    <View>
      <View>
        <Text>Pair</Text>
        <View>
        <Text>USDT</Text>
    
        </View>
      </View>

      <View>
      <View>
        <Text>Last</Text>
        <Text>Price</Text>
      </View>

      <View>
        <Text>24H</Text>
        <View>
        <Text>Change</Text>
    
        </View>
      </View>
      </View>

      <Separator/>
    </View>
  )
}

export default MarketSubHeaderPairsTabs

const styles = StyleSheet.create({})