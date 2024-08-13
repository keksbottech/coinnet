import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import MarketMovers from '@/components/market movers/MarketMovers'
import Portfolio from '@/components/portfolio/Portfolio'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from '@/components/trading chart/Chart'

const Home = () => {
  return (
    <SafeAreaView style={{padding:1, flex:1}}>
    <View className='h-full flex flex-col items-center '>
      <PageHeader icon={<EvilIcons name="user" size={35} color="black" />} other={<Ionicons name="settings-outline" size={24} color="black" />} label={
        <View className='flex flex-row items-center'>
           <Image 
        source={require('@/assets/images/logo/logo.png')} 
        style={{ width: 50, height: 50 }}
      />
      <Text style={{marginLeft:5}} className='font-bold text-3xl text-yellow-300'>Coinnet</Text>
          </View>
      }/>


      <View className='flex flex-col items-center justify-center w-full'>
        <Text className='font-bold text-lg'>Portfolio Balance</Text>
        <Text className='font-bold text-4xl' style={{marginTop:6}}>$2,760.23</Text>
        <Text className='font-bold'style={{marginTop:5}}>+2.60%</Text>
      </View>
<Chart/>

<ScrollView>
<View style={{paddingHorizontal:10}} className='flex flex-row w-full justify-between'>
    <Text className='font-bold text-xl'>Market Movers</Text>
    <TouchableOpacity>
        <Text className='font-bold text-lg text-yellow-500'>More</Text>
    </TouchableOpacity>
    </View>
    <FlatList
    style={{padding:10}}
    scrollEnabled={true}
    horizontal
    data={[0,0,0,0,0]}
    renderItem={({items}) => <MarketMovers/>}
    showsHorizontalScrollIndicator={false}
    />


<View style={{paddingHorizontal:10}} className='flex flex-row w-full justify-between'>
    <Text className='font-bold text-xl'>Portfolio</Text>
    <TouchableOpacity>
        <Text className='font-bold text-lg text-yellow-500'>More</Text>
    </TouchableOpacity>
    </View>

<View style={{padding:10}} >

{
 [0,0,0,0].map(coins =>     <Portfolio/>)
}
</View>


</ScrollView>

    </View>
    
  </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})