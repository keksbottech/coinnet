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
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />} 
        other={<AntDesign name="infocirlceo" size={24} color="black" />} 
        label={<Text style={styles.pageHeaderText}>Market</Text>} 
      />

      <View style={styles.container}>

        <View style={styles.searchContainer}>
          <AntDesign style={styles.searchIcon} name='search1' color={'black'} size={18}/>
          <Input style={styles.input} placeholder='Cryptocoin search'/>
        </View>
        <PopularTradeHeads data={['All Coins', 'Most Trade', 'Most Lose', 'New Coin']}/>

        <View style={{paddingHorizontal:-20}}>
          <MarketSubHeaderPairsTabs/>
        </View>
      
        <SwipeSide />
        
       {/* <MarketList/> */}
      </View>
    </SafeAreaView>
  )
}

export default Market

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding:10
  },
  pageHeaderText: {
  fontFamily:'MonsterBold',
    fontSize: 24, // Adjust the size if needed
  },
  container: {
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
  },
  input: {
    width: '100%',
    paddingLeft: 50,
    borderRadius: 10,
  },
})
