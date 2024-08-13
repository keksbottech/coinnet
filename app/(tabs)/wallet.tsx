import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AssetWalletBalance from '@/components/asset wallet balance/AssetWalletBalance'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Feather } from '@tamagui/lucide-icons'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AssetsActionButton from '@/components/assets action btns/AssetsActionButton'
import AssetsCategories from '@/components/assets categories/AssetsCategories'
import BottomDrawer from '@/components/bottom drawer/BottomDrawer'


const Wallet = () => {
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
      <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="clipboard" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Wallet</Text>} />
          
  
    <View style={{paddingTop:30}}>
      <TouchableOpacity style={{borderWidth:1, borderColor:'black',  padding:10, borderRadius:10}}>
        <Text className='text-center text-2xl' style={{fontFamily:'MonsterMid'}}>Portfolio</Text>
      </TouchableOpacity>
      <AssetsCategories/>
      <AssetWalletBalance/>

<AssetsActionButton/>
      <BottomDrawer/>
      <Text>Wallet</Text>
    </View>
    </SafeAreaView>
  )
}

export default Wallet

const styles = StyleSheet.create({})