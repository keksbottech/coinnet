import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import ReferralScreen from '@/components/share with friends/ShareWithFriends'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

const ShareWithFriends = () => {
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Share with friends</Text>} />
        
    <View className='h-full' style={{paddingTop:50}}>
      <ReferralScreen/>
    </View>
  </SafeAreaView>
  )
}

export default ShareWithFriends

const styles = StyleSheet.create({})