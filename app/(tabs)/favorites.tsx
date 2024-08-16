import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FavoritesCoinCards from '@/components/favorites coin cards/FavoritesCoinCards'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import MarketSubHeaderPairsTabs from '@/components/market header tabs/MarketSubHeaderPairsTabs'

const Favorites = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
    <PageHeader 
      icon={<FontAwesome name="angle-left" size={24} color="black" />} 
      other={<AntDesign name="infocirlceo" size={24} color="black" />} 
      label={<Text style={styles.pageHeaderText}>Favorites</Text>} 
    />

    <View style={styles.container}>
    <View style={{paddingHorizontal:-20}}>
          <MarketSubHeaderPairsTabs/>
        </View>
    
      <FavoritesCoinCards/>
    </View>
  </SafeAreaView>
  )
}

export default Favorites

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
})