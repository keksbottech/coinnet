import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FavoritesCoinCards from '@/components/favorites coin cards/FavoritesCoinCards'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import MarketSubHeaderPairsTabs from '@/components/market header tabs/MarketSubHeaderPairsTabs'
import { useAppSelector } from '@/hooks/useAppSelector'
import { ThemedText } from '@/components/ThemedText'

const Favorites = () => {
  const theme = useAppSelector(state => state.theme.theme)

  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
    <PageHeader 
      icon={<FontAwesome name="angle-left" size={24} color={theme ?'white':"black" }/>} 
      other={<AntDesign name="infocirlceo" size={24} color={theme ?'white':"black" }/>} 
      label={<ThemedText style={styles.pageHeaderText}>Favorites</ThemedText>} 
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