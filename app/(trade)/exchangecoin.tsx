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

    const navigateToConvertExchange = () => {
        router.navigate('/(trade)/confirmexchange')
    }
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <View className='h-full'>
        <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<AntDesign name="infocirlceo" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trading</Text>} />
          
  
        <TradingHeader data={tradingHeaderData}/>

        <ExchangeCrypto/>

<Button label='Buy' onClick={navigateToConvertExchange}/>
    </View>
    </SafeAreaView>
  )
}

export default ExchangeCoin

const styles = StyleSheet.create({})