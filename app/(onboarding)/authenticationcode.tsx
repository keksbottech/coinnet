import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import ProgressBar from '@/components/progress tab/ProgressTab'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import CountryPicker from 'react-native-country-picker-modal';


const AuthenticationCode = () => {  
    const router = useRouter()

  const navigateToKycVerification = () => {
      router.push('/(onboarding)/kycverification')
  }

  return (
    <SafeAreaView style={{flex:1, position:'relative', padding:10}}>
    <View className='h-full'>
        <PageHeader label={<ProgressBar currentStep={2}/>}/>
        <View className='mt-10'>


        <Text className='text-3xl' style={styles.title}>Enter authentication code</Text>

        <Text className='text-gray-500 text-xl' style={styles.text}>Enter the 7-digit code we just texted to your phone number</Text>
        <View>
      <Text className=' text-xl ' style={styles.title}>Code</Text>
      <Input style={{marginTop:10,fontFamily:'MonsterReg'}} placeholder='Authentication code'/>
      </View>
    </View>

<View style={{ flex:1, position:'absolute', width:'100%', bottom:10}}>
      <Button styles={{position:'relative'}} onClick={navigateToKycVerification} label='Continue'/>
      <Button styles={{position:'relative',borderSolid:.5, borderWidth: .5, bottom:10, backgroundColor:'transparent', fontWeight: 'bold'}}  label='Resend code'/>
    </View>
    </View>
    </SafeAreaView>
  )
}

export default AuthenticationCode

const styles = StyleSheet.create({
  title:{
    fontFamily:'MonsterBold'
  },
  text:{
    fontFamily:'MonsterReg',
    marginVertical:20, 
    width:300
  }
})