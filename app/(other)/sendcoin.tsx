import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Label } from 'tamagui'
import Input from '@/components/ui/input/Input'
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/ui/button/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import SendCoins from '@/components/send coins/SendCoins'

const SendCoinsPage = () => {
  return (
    <SafeAreaView style={{flex:1, padding:10}}>
                  <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />}  label={<Text className='font-bold text-3xl'>Send Coin</Text>} />
      <View className='h-full' style={{paddingTop:50}}>

<SendCoins/>
      <Button styles={{bottom:50}} label='Confirm'/>
      </View>
    </SafeAreaView>
  )
}

export default SendCoinsPage

const styles = StyleSheet.create({})