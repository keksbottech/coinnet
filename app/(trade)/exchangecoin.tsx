import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import TradingHeader from '@/components/trading header/TradingHeader'
import tradingHeaderData from '@/app json/tradingheaderbuysell.json'
import ExchangeCrypto from '@/components/exchange crypto/ExchangeCrypto'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'expo-router'

const ExchangeCoin = () => {
    const router = useRouter()

    const navigateToConfirmExchange = () => {
        router.navigate('/(trade)/confirmexchange')
    }
  return (
    <SafeAreaView style={{flex:1,padding:10, backgroundColor:'white'}}>
              <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<AntDesign name="infocirlceo" size={24} color="black" />} label={<Text className='text-2xl' style={{fontFamily:'MonsterBold'}}>Trading</Text>} />
          
              <TradingHeader style={{marginTop:20}}  data={tradingHeaderData}/>

    <View className='h-full'>
   
        <ExchangeCrypto/>

<Button styles={{bottom:150}} label='Buy' onClick={navigateToConfirmExchange}/>
    </View>
    </SafeAreaView>
  )
}

export default ExchangeCoin

const styles = StyleSheet.create({})