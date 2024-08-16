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
    <SafeAreaView style={{flex:1,backgroundColor:'white', padding:10}}>
    <View>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='text-2xl' style={{fontFamily:'MonsterBold'}}>Trading</Text>} />
          
  
  <TradingHeader style={{marginTop:20}}  data={tradingHeaderData} />
  <TradingCurrencySubHeader/>
<TradingAmountSubHeader/>
<FlatList
showsVerticalScrollIndicator={false}
    data={[0,1,2,3,4, 5]}
    keyExtractor={data => String(data)}
    renderItem={({item}) =>  <BuyCoinsP2P/>}
    contentContainerStyle={{paddingBottom:250}}
/>

    </View>
    </SafeAreaView>
  )
}

export default BuyTrading

const styles = StyleSheet.create({})