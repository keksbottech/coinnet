import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TradingHistory = () => {
  return (
    <View>
      <Text>Trading History</Text>

      <View>
        <View>
            <Text>Price</Text>
            <Text>30,122.83</Text>
            <Text>30,122.83</Text>
        </View>
        <View>
        <Text>Amount</Text>
        <Text>1,122.83</Text>
        <Text>1,122.83</Text>
        </View>
        <View>
        <Text>Time</Text>
        <Text>09:31:12</Text>
        <Text>09:31:12</Text>
        </View>
      </View>
    </View>
  )
}

export default TradingHistory

const styles = StyleSheet.create({})