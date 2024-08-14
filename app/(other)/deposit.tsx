import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';
import CardForm from '@/components/desposit/Deposit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';


const Deposit = () => {
  return (
    <SafeAreaView style={{flex:1, padding:10}}>
                  <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />}  label={<Text className='font-bold text-3xl'>Deposit</Text>} />
    <View className='h-full' style={{paddingTop:50}}>
<CardForm/>

<Button styles={{bottom:40}} label='Confirm'/>
    </View>
    </SafeAreaView>
  )
}

export default Deposit

const styles = StyleSheet.create({})