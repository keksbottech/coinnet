import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Withdraw from '@/components/withdraw/Withdraw'
import Button from '@/components/ui/button/Button'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import PageHeader from '@/components/page header/PageHeader'
import { Feather } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import BottomDrawer from '@/components/bottom drawer/BottomDrawer'
import { MaterialIcons } from '@expo/vector-icons'
import PaymentBottomDrawer from '../payment bottom drawer/PaymentBottomDrawer'


const WithdrawPage = () => {
    const router = useRouter()
    const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false)
  
  
    const enableBottomDrawer = () => {
  setIsBottomDrawerEnabled(!isBottomDrawerEnabled)
    }
    const navigateToConfirmWithdrawal = () =>{
        router.push('(trade)/confirmwithdraw')
    }
  return (
    <>
    <SafeAreaView style={{flex:1,padding:10}}>
            <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trading</Text>} />
          
  
    <View className='h-full' style={{paddingTop:30}}>
    <Withdraw enableBottomSheet={enableBottomDrawer}/>

    <Button onClick={navigateToConfirmWithdrawal} styles={{top:50, position:'relative'}} label='Continue'/>
    </View>
    </SafeAreaView>
    {isBottomDrawerEnabled &&  <PaymentBottomDrawer/>}
  </>
  )
}

export default WithdrawPage


const styles = StyleSheet.create({
 
});