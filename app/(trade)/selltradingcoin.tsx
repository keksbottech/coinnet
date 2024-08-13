import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather'
import TradingHeader from '@/components/trading header/TradingHeader'
import SellCoinsForm from '@/components/sell coins/SellCoins'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/components/ui/button/Button'
import { useRouter } from 'expo-router'
import tradingHeaderData from '@/app json/tradingheaderbuysell.json'



const SellTradingCoin = () => {
    const router = useRouter()

    const navigateToConfirmBuy = () =>{
        router.push('/')
    }
  return (
    <SafeAreaView style={{flex:1, padding:10}}>
    <View className='h-full'>
        <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trading</Text>} />
          
  
          <TradingHeader style={{marginTop:20}}  data={tradingHeaderData}/>

<SellCoinsForm/>
<Button label='Sell'/>
    </View>
    </SafeAreaView>
  )
}

export default SellTradingCoin

const styles = StyleSheet.create({})