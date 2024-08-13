import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TransactionAuthenticationCode from '@/components/transaction authentication code/TransactionAuthenticationCode'

const TransactionAuthenticationCodePage = () => {
  return (
    <SafeAreaView style={{flex:1, padding:10}}>
    <View className='h-full'>
        <TransactionAuthenticationCode/>
    </View>
    </SafeAreaView>
  )
}

export default TransactionAuthenticationCodePage

const styles = StyleSheet.create({})