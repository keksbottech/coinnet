import { ScrollView, StyleSheet, Text, View } from 'react-native'
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


const Market = () => {

  const [marketData, setMarketData] = useState(null)  
    const [isLoading, setIsLoading] = useState(false)  
    const [value, setValue] = useState('')

    useEffect(()=>{
        fetchPrice()
    },[])


    const getValuesFromInput = (value) => {
      setValue(value)
    }

    const fetchPrice = async () => {
        try {
            setIsLoading(true)
          const response = await axios.get('https://api.coincap.io/v2/assets');
          // console.log(response.data)
          setMarketData(response.data.data);
        } catch (error) {
          console.error('Error fetching price:', error.message);
        }
        finally{
            setIsLoading(false)
        }
      
      }

   const getCoinBySearch = async () => {
    try{
      if(!value){
        setIsLoading(true)
          const response = await axios.get('https://api.coincap.io/v2/assets');
          // console.log(response.data)
          setMarketData(response.data.data);
      }

      setIsLoading(true)

      const response = await axios.get(`https://api.coincap.io/v2/assets/${value.toLowerCase()}`);
    
      setMarketData([response.data.data]); 
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
   }



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
          <Input onSubmit={getCoinBySearch} value={value} onChangeText={getValuesFromInput} style={styles.input} placeholder='Cryptocoin search'/>
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
      {isLoading &&   <Wave size={48} color="black"/>}

      </View>

        <MarketDataSwipeSide marketData={marketData} />
        
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
