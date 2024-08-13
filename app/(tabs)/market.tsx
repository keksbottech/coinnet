import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import Input from '@/components/ui/input/Input'
import PopularTradeHeads from '@/components/popular pairs header/PopularPairsHeader'
import MarketSubHeaderPairsTabs from '@/components/market header tabs/MarketSubHeaderPairsTabs'
import SwipeSide from '@/components/swipe side/SwipeSide'
import MarketHeaderTabs from '@/components/market header tabs/MarketHeaderTabs'
import MarketList from '@/components/market coin cards/MarketCoinCards'

const Market = () => {
  return (
    <SafeAreaView style={{flex:1}}>
              <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<AntDesign name="infocirlceo" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trading</Text>} />
          
    <View>

      <View style={{flexDirection:'row', alignItems:'center'}}>
        <AntDesign style={{position:'absolute', left:20}} name='search1' color={'black'} size={18}/>
        <Input style={{width:'100%', paddingLeft:50, borderRadius:10}} placeholder='Cryptocoin search'/>
      </View>
      <PopularTradeHeads data={['All Coins', 'Most Trade', 'Most Lose', 'New Coin']}/>

      <View>
    <MarketSubHeaderPairsTabs/>
      </View>
    
      <SwipeSide />
      
     {/* <MarketList/> */}
    </View>
    </SafeAreaView>
  )
}

export default Market

const styles = StyleSheet.create({})