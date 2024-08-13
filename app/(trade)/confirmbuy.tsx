import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ConfirmationBuy from '@/components/confirmation buy/ConfirmationBuy'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign';



const ConfirmBuy = () => {
  return (
    <SafeAreaView style={{flex:1, padding:20}}>
            <PageHeader other={<AntDesign name="infocirlceo" size={24} color="black" />} icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Confirmation</Text>}/>
        
    <View className='h-full pt-20'>
      <ConfirmationBuy/>
    </View>
    </SafeAreaView>
  )
}

export default ConfirmBuy

const styles = StyleSheet.create({})