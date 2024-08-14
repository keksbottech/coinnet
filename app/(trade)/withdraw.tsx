import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Withdraw from '@/components/withdraw/Withdraw'
import Button from '@/components/ui/button/Button'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import PageHeader from '@/components/page header/PageHeader'
import { Feather } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'

const WithdrawPage = () => {
    const router = useRouter()

    const navigateToConfirmWithdrawal = () =>{
        router.push('(trade)/confirmwithdraw')
    }
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
            <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trading</Text>} />
          
  
    <View className='h-full' style={{paddingTop:30}}>
    <Withdraw/>

    <Button onClick={navigateToConfirmWithdrawal} styles={{bottom:50}} label='Continue'/>
    </View>
    </SafeAreaView>
  )
}

export default WithdrawPage

const styles = StyleSheet.create({})