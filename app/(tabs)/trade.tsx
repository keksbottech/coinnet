import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import Ionicons from '@expo/vector-icons/Ionicons'
import TradingHeaderTime from '@/components/trading header/TradingHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import Portfolio from '@/components/portfolio/Portfolio'
import Chart from '@/components/trading chart/Chart'
import PopularPairs from '@/components/popular pairs/PopularPairs'
import TradingHistory from '@/components/trading history/TradingHistory'
import { Separator } from 'tamagui'
import Button from '@/components/ui/button/Button'
import TradingTools from '@/components/trading tools/TradingTools'
import { useRouter } from 'expo-router'
import tradePeriodsData from '@/app json/tradingperiodtime.json'
import TradingHeaderPeriod from '@/components/trading header period/TradingHeaderPeriod'




const Trading = () => {
  const router = useRouter()

  const navigateToBuyTrading = () => {
    router.push('(trade)/buytrading')
  }
  return (
    <SafeAreaView style={{padding:10, flex:1}}>

    <View>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Trading</Text>} />
          
  
      <TradingHeaderPeriod data={tradePeriodsData}/>

      <Portfolio style={{backgroundColor: 'transparent',     shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 0}}/>
<Chart styles={{marginTop:0}} withVerticalLabels={true}/>
<TradingTools/>
<View>
  <PopularPairs/>
  <TradingHistory/>
  <Separator style={{marginTop:40}}/>

  <View className='flex justify-center items-center w-full flex-row ' style={{marginTop:15}}>
    <TouchableOpacity style={[styles.button, , styles.button1]}>
      <View style={[styles.icon, styles.icon1]}>
    <Feather name="arrow-down-left" size={24}  color="red" />
    </View>
      <Text style={{color:'orangered'}}>SELL</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={navigateToBuyTrading} style={[styles.button]}>
      <View style={styles.icon}>
    <Feather name="arrow-up-right" size={24} color="white" />
    </View>
      <Text style={{color:'white'}}>BUY</Text>
    </TouchableOpacity>
  </View>
</View>
    </View>
  </SafeAreaView>
  )
}

export default Trading

const styles = StyleSheet.create({
  button:{
    alignItems:'center',
    flexDirection:'row',
    padding:10,
    backgroundColor:'orangered',
    marginRight:10,
    borderRadius:10,
    width:150,
    justifyContent:'center'
  },
  button1:{
    borderColor:'orangered',
    backgroundColor:'transparent',
    borderWidth:3
  },
  icon:{
    marginRight:5,
    borderColor:'white',
    backgroundColor:'transparent',
    borderWidth:1,
  },
  icon1:{
    color:'yellow',
    borderColor:'orangered',
    backgroundColor:'transparent',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    borderRadius:3
  }
})