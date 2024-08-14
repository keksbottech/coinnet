import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TransferToCoinnetUser from '@/components/transer to coinnet user/TransferToCoinnetUser'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import { FontAwesome } from '@expo/vector-icons'

const TranserToCoinnetUserPage = () => {
  return (
        
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Transfer</Text>} />
        
    <View className='h-full' style={{paddingTop:50}}>
     <TransferToCoinnetUser/>
    </View>

</SafeAreaView>
  )
}

export default TranserToCoinnetUserPage

const styles = StyleSheet.create({})