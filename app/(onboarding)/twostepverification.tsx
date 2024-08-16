import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import ProgressBar from '@/components/progress tab/ProgressTab'
import Select from '@/components/select/Select'
import countryCodes from '@/app json/countrycodes.json'
import { useRouter } from 'expo-router'
import CountryPicker from 'react-native-country-picker-modal';

const TwoStepVerification = () => {
  const router = useRouter()
  const [countryCode, setCountryCode] = useState('NG');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState(null);



  const navigateToAuthenticationCode = () => {
    router.push('/(onboarding)/authenticationcode')
}


  return (
    <SafeAreaView style={{flex:1, padding:10, width:'100%'}}>
      <View className='h-full w-full'>
      <PageHeader label={<ProgressBar currentStep={2}/>}/>
    <View className='mt-10'>
      <Text style={styles.title} className=' text-3xl'>Set up 2-step verification</Text>
      <Text style={[styles.text, {marginTop:10}]} className='text-lg text-gray-500' >Enter your phone number so we can text you an authentication code.</Text>

      <View style={{marginTop:20}}>
        <View style={{marginVertical:5}} className='flex flex-row items-center'>
          <Text style={styles.title} className=' text-xl'>Country</Text>
          <Text style={[styles.title, {marginLeft:20}]} className=' text-xl'>Phone</Text>
        </View>

        <View className='w-full'>
          <View style={styles.inputContainer} className='flex flex-row justify-between items-center w-full' >
          <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCountryNameButton={false}
          withCallingCode
          withEmoji
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCountry(country);
          }}
      
          containerButtonStyle={styles.countryPicker}
        />
              <Text style={styles.callingCode}>+{country ? country?.callingCode : '234'}</Text>
            <Input style={{borderColor:'transparent', width:'100%',fontFamily:'MonsterReg'}} placeholder='You phone number'/>
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

const styles = StyleSheet.create({
  title:{
    fontFamily:'MonsterBold'
  },
  text:{
    fontFamily:'MonsterReg'
  },
  countryPicker: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  callingCode: {
    paddingHorizontal: 10,
    fontFamily:'MonsterReg'
  },
  inputContainer:{
    borderColor:'black',
    borderWidth:.4,
    padding:5,
borderRadius:5,
marginTop:10
  }
})