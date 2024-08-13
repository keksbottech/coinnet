import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Feather from '@expo/vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import TradingHeader from '@/components/trading header/TradingHeader'
import TradingCurrencySubHeader from '@/components/trading currency sub header/TradingCurrencySubHeader'
import TradingAmountSubHeader from '@/components/trading currency sub header/TradingAmountSubHeader'
import BuyCoinsP2P from '@/components/buy coins p2p/BuyCoinsP2P'
import { useRouter } from 'expo-router'
import tradingHeaderData from '@/app json/tradingheaderbuysell.json'



const BuyTrading = () => {
    const router = useRouter()


  return (
    <SafeAreaView>
    <View>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trading</Text>} />
          
  
  <TradingHeader data={tradingHeaderData} />
  <TradingCurrencySubHeader/>
<TradingAmountSubHeader/>
<FlatList
    data={[0,0,0,0]}
    keyExtractor={data => 0}
    renderItem={({items}) =>  <BuyCoinsP2P/>}
/>

    </View>
    </SafeAreaView>
  )
}

export default BuyTrading

const styles = StyleSheet.create({})