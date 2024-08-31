import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native'
import MarketMovers from '@/components/market movers/MarketMovers';
import axios from 'axios';
import PageHeader from '@/components/page header/PageHeader';
import { FontAwesome } from '@expo/vector-icons';
import Loading from '@/components/loading/Loading';
import { Wave } from 'react-native-animated-spinkit'

const screenWidth = Dimensions.get("window").width;

const MoreMarketData = () => {
    const [marketData, setMarketData] = useState(null)  
    const [isLoading, setIsLoading] = useState(false)  

    useEffect(()=>{
        fetchPrice()
    },[])


    const fetchPrice = async () => {
        try {
            setIsLoading(true)
          const response = await axios.get('https://api.coincap.io/v2/assets');
          console.log(response.data)
          setMarketData(response.data.data);
        } catch (error:any) {
          console.error('Error fetching price:', error.message);
        }
        finally{
            setIsLoading(false)
        }
      
      }
  
  
  return (
    <SafeAreaView style={{justifyContent:'center',alignItems:'center'}}>
                <PageHeader
          icon={<FontAwesome name="angle-left" size={24} color="black" />}
          label={<Text style={{ fontFamily: 'MonsterBold', fontSize:20 }}>Market Movers</Text>}
        />
          
        {isLoading &&   <Wave size={48} color="black"/>}
               <FlatList
            style={styles.flatList}
            scrollEnabled={true}
            data={marketData}
            renderItem={({ item, index }) => {
              if(index >= 0 && index < 50){
              return <MarketMovers width={{ width: screenWidth * 0.95 }} volume={item.volumeUsd24Hr} priceUsd={item.priceUsd} changePercent24Hr={item.changePercent24Hr} symbol={item.symbol} image={''}/>
              }
              else {
                return null
              }
          
            }}
            showsHorizontalScrollIndicator={false}
       
          />
    </SafeAreaView>
  )
}

export default MoreMarketData

const styles = StyleSheet.create({
    flatList: {
        padding: 10,
      },
})