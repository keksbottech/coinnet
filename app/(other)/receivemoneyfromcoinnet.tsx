import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReceiveMoneyFromCoinnet from '@/components/receive money from coinnet/ReceiveMoneyFromCoinnet'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import { FontAwesome } from '@expo/vector-icons'

const ReceiveMoneyFromCoinnetPage = () => {
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Receive money from Coinnet user</Text>} />
        
    <View className='h-full' style={{paddingTop:50}}>
      <ReceiveMoneyFromCoinnet/>
    </View>
    </SafeAreaView>
  )
}

export default ReceiveMoneyFromCoinnetPage

const styles = StyleSheet.create({})