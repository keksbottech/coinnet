import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Feather } from '@tamagui/lucide-icons'
import WithdrawConfirmation from '@/components/withdraw confirmation/WithdrawConfirmation'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'expo-router'

const ConfirmWithdrawPage = () => {
    const router = useRouter()

    const navigateToAuthenticationCode = () => {
        router.push('(trade)/transactionauthenticationcode')
    }
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
               <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Confirm Withdraw</Text>} />
    <View className='h-full'>
        <WithdrawConfirmation/>
<Button onClick={navigateToAuthenticationCode} styles={{bottom:50}} label='Withdraw'/>
    </View>
    </SafeAreaView>
  )
}

export default ConfirmWithdrawPage

const styles = StyleSheet.create({})