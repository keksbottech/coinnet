import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TradingHistory = () => {
  return (
    <View style={{marginTop:20}}>
      <Text className='font-bold text-2xl'>Trading History</Text>

      <View className='flex flex-row items-center justify-between' style={{marginTop:10}}>
        <View>
            <Text className='font-bold'>Price</Text>
            <Text className='font-bold' style={{color:'red', marginTop:3}}>30,122.83</Text>
            <Text className='font-bold' style={{color:'red', marginTop:3}} >30,122.83</Text>
        </View>
        <View>
        <Text className='font-bold'>Amount</Text>
        <Text className='font-bold' style={{ marginTop:3}} >1,122.83</Text>
        <Text className='font-bold' style={{ marginTop:3}} >1,122.83</Text>
        </View>
        <View>
        <Text className='font-bold'>Time</Text>
        <Text className='font-bold' style={{marginTop:3}}>09:31:12</Text>
        <Text className='font-bold' style={{marginTop:3}}>09:31:12</Text>
        </View>
      </View>
    </View>
  )
}

export default TradingHistory

const styles = StyleSheet.create({})