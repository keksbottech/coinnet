import { ScrollView, StyleSheet, Text, Touchable, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign'
import Input from '@/components/ui/input/Input'
import PopularTradeHeads from '@/components/popular pairs header/PopularPairsHeader'
import MarketSubHeaderPairsTabs from '@/components/market header tabs/MarketSubHeaderPairsTabs'
import MarketHeaderTabs from '@/components/market header tabs/MarketHeaderTabs'
import MarketList from '@/components/market coin cards/MarketCoinCards'
import axios from 'axios'
import MarketDataSwipeSide from '@/components/market data swipe side/MarketDataSwiperSlide'
import Loading from '@/components/loading/Loading';
import { Wave } from 'react-native-animated-spinkit'
import { TouchableOpacity } from 'react-native'
import { getMarketData } from '@/lib/store/reducers/storeMarketData'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { ToastAndroid } from 'react-native'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ThemedText } from '@/components/ThemedText'
import { useRouter } from 'expo-router'


const Market = () => {

  const [marketData, setMarketData] = useState<any>(null)  
    const [isLoading, setIsLoading] = useState(false)  
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.theme.theme)
    const router = useRouter()
    
    useEffect(()=>{
        fetchPrice()
    },[])


    const getValuesFromInput = (value:any) => {
      setValue(value)
    }

    const fetchPrice = async () => {
      try {
        setIsLoading(true)
        const apiKey = 'cdac7eceac8c9e80db25590f3a5886471f2e1a503f593df1b8b84bb8f5fe99b8';
        const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=50&tsym=USD';
        
       const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          }
        })
        dispatch(getMarketData(response.data.Data))
        setMarketData(response.data.Data);
      } catch (error) {
        console.error('Error fetching price:', error);
      }
      finally{
        setIsLoading(false)
      }
    
    }



   const getCoinBySearch = async () => {
    try{
      if(!value){
        setIsLoading(true)
        await fetchPrice()
      }

      setIsLoading(true)

      const response = await axios.get(`https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${value}`);
    
      console.log(response.data, 'search')
      setMarketData([response.data.data]); 
    }
    catch(err){
      ToastAndroid.show('Something went wrong fetching data. Try refreshing!', ToastAndroid.SHORT);

      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
   }

   const navigateToFavorites = () => {
  router.push('/(other)/favorites')
   }



  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color={theme ?'white':"black"} />} 
        other={
          <TouchableOpacity onPress={navigateToFavorites}>
            <AntDesign name="staro" size={24} color="black" />
          </TouchableOpacity>
        } 
        label={<ThemedText style={styles.pageHeaderText}>Market</ThemedText>} 
      />

      <View style={styles.container}>

        <View style={styles.searchContainer}>
          <AntDesign style={styles.searchIcon} name='search1' color={theme ?'white' : 'black'} size={18}/>
          <Input onSubmit={getCoinBySearch} value={value} onChangeText={getValuesFromInput} style={styles.input} placeholderTextColor={theme ? 'white': 'black'} placeholder='Cryptocoin search... Search in Symbols (BTC)'/>
        </View>
        {/* , 'Most Trade', 'Most Lose', 'New Coin' */}
        {/* <PopularTradeHeads data={['All Coins']}/> */}

<TouchableOpacity style={styles.tab} onPress={fetchPrice}>
  <Text style={styles.tabText}>All Coins</Text>
</TouchableOpacity>
        <View style={{paddingHorizontal:-20}}>
          <MarketSubHeaderPairsTabs/>
        </View>
      
      <View style={{justifyContent:'center', alignItems:'center'}}>
      {isLoading &&   <Wave size={48} color={theme ?'white':"black"}/>}

      </View>

        <MarketDataSwipeSide fetchData={fetchPrice} marketData={marketData} />
        
       {/* <MarketList/> */}
      </View>
    </SafeAreaView>
  )
}

export default Market

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding:10,

  },
  pageHeaderText: {
  fontFamily:'MonsterBold',
    fontSize: 24, // Adjust the size if needed
  },
  container: {

    width:'100%'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
justifyContent:'space-between',
width:'100%'
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
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width:90,
    marginVertical:10
  },
  activeTab: {
    backgroundColor: '#FFFF00', // Yellow color for active tab
  },
  tabText: {
    color: '#555',
    fontFamily: 'MonsterReg',
  },
  activeTabText: {
    color: '#000', // Text color for active tab
  },
})
