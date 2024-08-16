import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConfirmTransfer from '@/components/confirm transfer/ConfirmTransfer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import PageHeader from '@/components/page header/PageHeader'

const ConfirmTransferPage = () => {
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Transfer</Text>} />
        
    <View className='h-full' style={{paddingTop:50}}>
      <ConfirmTransfer/>
    </View>
    </SafeAreaView>
  )
}

export default ConfirmTransferPage

const styles = StyleSheet.create({})