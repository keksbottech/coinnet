import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import TransactionComplete from '@/components/transaction complete/TransactionComplete'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const TransactionCompletePage = () => {
const router = useRouter()

const navigateToTransactionHistory = () => {
  router.push('(trade)/transactionhistory')
}
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
              <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<AntDesign name="infocirlceo" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trasaction Completed</Text>} />
    <View className='h-full' style={{paddingTop:80}}>
      
          
   <TransactionComplete/>

   <TouchableOpacity onPress={navigateToTransactionHistory}>
    <Text>Transaction History</Text>
   </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default TransactionCompletePage

const styles = StyleSheet.create({})