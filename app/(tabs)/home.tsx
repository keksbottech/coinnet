import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import MarketMovers from '@/components/market movers/MarketMovers'
import Portfolio from '@/components/portfolio/Portfolio'

const Home = () => {
  return (
    <View>
      <PageHeader/>
      <View>
        <Text>Portfolio Balance</Text>
        <Text>$2,760.23</Text>
        <Text>+2.60%</Text>
      </View>

<MarketMovers/>

<Portfolio/>


    </View>
  )
}

export default Home

const styles = StyleSheet.create({})