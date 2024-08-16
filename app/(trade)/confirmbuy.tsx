import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ConfirmationBuy from '@/components/confirmation buy/ConfirmationBuy'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomDrawer from '@/components/bottom drawer/BottomDrawer'
import { TouchableOpacity } from 'react-native'
import PaymentBottomDrawer from '../payment bottom drawer/PaymentBottomDrawer'





const ConfirmBuy = () => {
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null);



  const enableBottomDrawer = () => {
setIsBottomDrawerEnabled(!isBottomDrawerEnabled)
  }
  return (
    <>
    
    <SafeAreaView style={{flex:1, padding:20}}>
            <PageHeader other={<AntDesign name="infocirlceo" size={24} color="black" />} icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className=' text-2xl' style={{fontFamily:'MonsterBold'}}>Confirmation</Text>}/>
        
    <View className='h-full pt-20'>
      <ConfirmationBuy enableBottomDrawerFunc={enableBottomDrawer}/>
    </View>
    </SafeAreaView>
    {isBottomDrawerEnabled && <PaymentBottomDrawer/>}
  </>
  )
}

export default ConfirmBuy

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal:20
  },
  title: {
    fontSize: 18,
    fontFamily:'MonsterBold',
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  methodDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  methodName: {
    fontSize: 16,
 fontFamily:'MonsterBold'
  },
  methodNumber: {
    fontSize: 14,
    color: '#888',
    fontFamily:'MonsterReg'
  },
});