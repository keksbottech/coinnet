import { FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
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
import { useFocusEffect } from '@react-navigation/native'

const Trading = () => {
  const router = useRouter()
  const [marketData, setMarketData] = useState<any>(null)
  const popularPair = useAppSelector(state => state.market.popularPairs)
  const [marketHistoryData, setMarketHistoryData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const marketStoredData = useAppSelector(state => state.market.marketData)
  

  // useEffect(() =>{
  //   fetchSingleMarketDetails()
  //   fetchMarketPairTradingHistory()
  // }, [popularPair])

  
  useFocusEffect(
    useCallback(() => {
      fetchSingleMarketDetails()
      fetchMarketPairTradingHistory()
      return () => {
        console.log('Screen is unfocused, cleaning up...');
      };
    }, [popularPair])
  );

  const fetchSingleMarketDetails = async () =>{
    try{
      const btcData = marketStoredData.find((coin: { CoinInfo: { Name: string } }) => coin.CoinInfo.Name === 'BTC');
      const ethData = marketStoredData.find((coin: { CoinInfo: { Name: string } }) => coin.CoinInfo.Name === 'ETH');
      const usdCData = marketStoredData.find((coin: { CoinInfo: { Name: string } }) => coin.CoinInfo.Name === 'USDC');
      const bnbData = marketStoredData.find((coin: { CoinInfo: { Name: string } }) => coin.CoinInfo.Name === 'BNB');
      const solData = marketStoredData.find((coin: { CoinInfo: { Name: string } }) => coin.CoinInfo.Name === 'SOL');


      switch(popularPair){
        case 'BTC/USD':
          console.log(btcData?.DISPLAY?.USD?.PRICE)
          setMarketData({priceUsd: btcData?.DISPLAY?.USD?.PRICE, changePercent24Hr: btcData?.DISPLAY?.USD?.CHANGEPCT24HOUR, image: btcData?.CoinInfo?.ImageUrl})
          break;
        case 'ETH/USD':
          setMarketData({priceUsd: ethData?.DISPLAY?.USD?.PRICE, changePercent24Hr: ethData?.DISPLAY?.USD?.CHANGEPCT24HOUR, image: ethData?.CoinInfo?.ImageUrl})
          break;
       case 'SOL/USD':
        setMarketData({priceUsd: solData?.DISPLAY?.USD?.PRICE, changePercent24Hr: solData?.DISPLAY?.USD?.CHANGEPCT24HOUR, image: solData?.CoinInfo?.ImageUrl})
            break;
      case 'USDC/USD':
        setMarketData({priceUsd: usdCData?.DISPLAY?.USD?.PRICE, changePercent24Hr: usdCData?.DISPLAY?.USD?.CHANGEPCT24HOUR, image: usdCData?.CoinInfo?.ImageUrl})
          default:
            return null
      }

    }
    catch(err){
      ToastAndroid.show('Something went wrong fetching data. Try refreshing!', ToastAndroid.SHORT);

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
      case 'USDC/USD':
            const xpr = await axios.get('https://api.coincap.io/v2/assets/tether/history?interval=d1')
            console.log(xpr.data)
            setMarketHistoryData(xpr.data.data)
          default:
            return null
      }
    }
    catch(err){
      ToastAndroid.show('Something went wrong fetching your pair data. Try refreshing!', ToastAndroid.SHORT);

      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  }
  const navigateToBuyTrading = () => {
    router.push('/(trade)/buytrading')
  }

  const navigateToSellTrading = () => {
    router.push('/(trade)/selltradingcoin')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <PageHeader 
          icon={<FontAwesome name="angle-left" size={24} color="black" />} 
          // other={<Feather name="clipboard" size={24} color="black" />} 
          label={<Text style={styles.pageHeaderText}>Trading</Text>} 
        />
{/* 
        <TradingHeaderPeriod data={tradePeriodsData} style={undefined} /> */}

        <Portfolio priceUsd={marketData?.priceUsd} image={marketData?.image} style={styles.portfolio} name={marketData?.name} symbol={marketData?.symbol} changePercent24Hr={parseFloat(marketData?.changePercent24Hr)} />
        <Chart styles={styles.chart} withVerticalLabels={true} />
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
     
          
          <Separator />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={navigateToSellTrading} style={[styles.button, styles.button1]}>
              <View style={[styles.icon, styles.icon1]}>
                <Feather name="arrow-down-left" size={24} color="#F9C74F" />
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
    backgroundColor: '#F9C74F',
    marginRight: 10,
    borderRadius: 10,
    width: 150,
    justifyContent: 'center',
    
  },
  button1: {
    borderColor: '#F9C74F',
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
    color: '#F9C74F',
    borderColor: '#F9C74F',
    backgroundColor: 'transparent',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 6,
  },
  sellText: {
    color: '#F9C74F',
      fontFamily:'MonsterBold'
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
