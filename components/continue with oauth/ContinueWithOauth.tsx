import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Separator } from 'tamagui'
import GoogleImage from '@/assets/svg/google.svg'
import AppleImage from '@/assets/svg/apple.svg'
import FacebookImage from '@/assets/svg/facebook.svg'


type ContinueWithOauthTypes = {
  styles?: {}
}

const ContinueWithOauth = ({styles}: ContinueWithOauthTypes) => {


  return (
  
    <View style={styles} className='flex flex-col items-center justify-center'>
    <View className='flex flex-row items-center' style={{marginBottom:30}}>
       
        <Separator/>
        <Text style={{marginHorizontal:10}} className='font-bold text-lg'>or continue with</Text>
       
        <Separator/>
    </View>

    <View className='flex flex-row items-center'>

    <TouchableOpacity style={{marginRight:10}}>
    <FacebookImage/>
    </TouchableOpacity>

    <TouchableOpacity style={{marginRight:10}}>
    <AppleImage/>
    </TouchableOpacity>      
    
      <TouchableOpacity style={{marginRight:10}}>
        <GoogleImage/>
    </TouchableOpacity>
</View>
  </View>
  )
}

export default ContinueWithOauth

const styles = StyleSheet.create({})