import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import ProgressBar from '@/components/progress tab/ProgressTab'
import Select from '@/components/select/Select'
import countryCodes from '@/app json/countrycodes.json'
import { useRouter } from 'expo-router'

const TwoStepVerification = () => {
  const router = useRouter()


  const navigateToAuthenticationCode = () => {
    router.push('/(onboarding)/authenticationcode')
}


  return (
    <SafeAreaView style={{flex:1, padding:10, width:'100%'}}>
      <View className='h-full w-full'>
      <PageHeader label={<ProgressBar/>}/>
    <View className='mt-10'>
      <Text className='font-bold text-3xl'>Set up 2-step verification</Text>
      <Text style={{marginTop:10}} className='text-xl text-gray-500'>Enter your phone number so we can text you an authentication code.</Text>

      <View style={{marginTop:20}}>
        <View style={{marginVertical:5}} className='flex flex-row items-center'>
          <Text className='font-bold text-xl'>Country</Text>
          <Text className='font-bold text-xl' style={{marginLeft:10,color:'yellow'}}>Phone</Text>
        </View>

        <View className='w-full'>
          <View className='flex flex-row justify-between items-center w-full'>
            <Select data={countryCodes}/>
            <Input style={{width:'70%'}} placeholder='You phone number'/>
          </View>
        </View>


      </View>
    </View>

  <Button label='Continue' onClick={navigateToAuthenticationCode}/>
  </View>
    </SafeAreaView>
  )
}

export default TwoStepVerification

const styles = StyleSheet.create({})