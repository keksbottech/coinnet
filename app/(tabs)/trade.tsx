import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ScrollView } from 'react-native'
import { Wave } from 'react-native-animated-spinkit'

const Trading = () => {
  const router = useRouter()
  const [marketData, setMarketData] = useState(null)
  const popularPair = useAppSelector(state => state.market.popularPairs)
  const [marketHistoryData, setMarketHistoryData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() =>{
    fetchSingleMarketDetails()
    fetchMarketPairTradingHistory()
  }, [popularPair])

  const fetchSingleMarketDetails = async () =>{
    try{
      switch(popularPair){
        case 'BTC/USD':
          const btc = await axios.get('https://api.coincap.io/v2/assets/bitcoin')
          console.log(btc.data)
          setMarketData(btc.data.data)
          break;
        case 'ETH/USD':
          const eth = await axios.get('https://api.coincap.io/v2/assets/ethereum')
          console.log(eth.data)
          setMarketData(eth.data.data)
          break;
       case 'LTC/USD':
            const ltc = await axios.get('https://api.coincap.io/v2/assets/litecoin')
            console.log(ltc.data)
            setMarketData(ltc.data.data)
            break;
      case 'USDT/USD':
            const xpr = await axios.get('https://api.coincap.io/v2/assets/tether')
            console.log(xpr.data)
            setMarketData(xpr.data.data)
          default:
            return null
      }

    }
    catch(err){
      console.log(err)
    }
  }


  const fetchMarketPairTradingHistory = async () =>{
    try{
      
      setIsLoading(true)
      // api.coincap.io/v2/assets/bitcoin/history?interval=d1
      switch(popularPair){
        case 'BTC/USD':
          const btc = await axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1')
          console.log(btc.data)
          setMarketHistoryData(btc.data.data)
          break;
        case 'ETH/USD':
          const eth = await axios.get('https://api.coincap.io/v2/assets/ethereum/history?interval=d1')
          console.log(eth.data)
          setMarketHistoryData(eth.data.data)
          break;
       case 'LTC/USD':
            const ltc = await axios.get('https://api.coincap.io/v2/assets/litecoin/history?interval=d1')
            console.log(ltc.data)
            setMarketHistoryData(ltc.data.data)
            break;
      case 'USDT/USD':
            const xpr = await axios.get('https://api.coincap.io/v2/assets/tether/history?interval=d1')
            console.log(xpr.data)
            setMarketHistoryData(xpr.data.data)
          default:
            return null
      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  }
  const navigateToBuyTrading = () => {
    router.push('(trade)/buytrading')
  }

  const navigateToSellTrading = () => {
    router.push('(trade)/selltradingcoin')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <PageHeader 
          icon={<FontAwesome name="angle-left" size={24} color="black" />} 
          other={<Feather name="clipboard" size={24} color="black" />} 
          label={<Text style={styles.pageHeaderText}>Trading</Text>} 
        />
{/* 
        <TradingHeaderPeriod data={tradePeriodsData} style={undefined} /> */}

        <Portfolio priceUsd={marketData?.priceUsd} style={styles.portfolio} name={marketData?.name} symbol={marketData?.symbol} changePercent24Hr={marketData?.changePercent24Hr} />
        <Chart style={styles.chart} withVerticalLabels={true} />
        {/* <TradingTools /> */}
        <PopularPairs />
        <View style={{marginTop:15}}>
          <Text style={styles.title}>Trading History</Text>
          <View style={styles.row}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.label}>Time</Text>
          </View>
          <View style={{alignItems:'center'}}>
          {isLoading && <Wave size={48} color="black"/>}
          </View>
          <FlatList
          data={marketHistoryData}
          showsVerticalScrollIndicator={false}
        renderItem={({item}) => <TradingHistory priceUsd={item.priceUsd} timestamp={item.time}/>}
          />
     
          
          <Separator style={styles.separator} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={navigateToSellTrading} style={[styles.button, styles.button1]}>
              <View style={[styles.icon, styles.icon1]}>
                <Feather name="arrow-down-left" size={24} color="red" />
              </View>
              <Text style={styles.sellText}>SELL</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={navigateToBuyTrading} style={styles.button}>
              <View style={styles.icon}>
                <Feather name="arrow-up-right" size={24} color="white" />
              </View>
              <Text style={styles.buyText}>BUY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default Trading

const styles = StyleSheet.create({
  safeArea: {
    padding: 10,
    flex: 1,
    backgroundColor:'white'
  },
  pageHeaderText: {
   fontFamily:'MonsterBold',
    fontSize: 24, // Adjust the size if needed
  },
  portfolio: {
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 0,
  },
  chart: {
    marginTop: 0,
  },
  separator: {
    marginTop: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position:'absolute',
    top:200
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'orangered',
    marginRight: 10,
    borderRadius: 10,
    width: 150,
    justifyContent: 'center',
  },
  button1: {
    borderColor: 'orangered',
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  icon: {
    marginRight: 8,
    borderColor: 'white',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius:6
  },
  icon1: {
    color: 'yellow',
    borderColor: 'orangered',
    backgroundColor: 'transparent',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 6,
  },
  sellText: {
    color: 'orangered',
      fontFamily:'MonsterReg'
  },
  buyText: {
    color: 'white',
      fontFamily:'MonsterReg'
  },
  title: {
    fontSize: 17, // Adjust the size if needed
    fontFamily:'MonsterBold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  label: {
       fontFamily:'MonsterBold',
  },
})
