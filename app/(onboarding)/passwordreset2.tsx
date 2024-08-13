import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import Input from '@/components/ui/input/Input';
import OTPInput from '@/components/input otp/InputOtp';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MailTwo from '@/assets/svg/mail1.svg'
import Button from '@/components/ui/button/Button';
import { useRouter } from 'expo-router';

const Passwordreset2 = () => {
  const router = useRouter()

  
  const navigateToPasswordReset3 = () => {
    router.push('/(onboarding)/passwordreset3')
  }


  return (

        <SafeAreaView style={{flex:1, padding:10}}>
  <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<NumberStepProgress/>}/>
  
    <View className='flex flex-col pt-10 h-full items-center'>
  
      <View>
        <Text className='text-3xl text-center font-bold'>Please enter the code</Text>
        <Text className='font-bold' style={{marginTop:5}}>We sent email to tomododj@kd.com</Text>
      </View>

      <View>
      <MailTwo/>
      </View>

      <View style={{marginTop:20}}>
       <OTPInput/>
      </View>

      <View className='font-bold flex flex-row items-center text-lg mt-10'>
        <Text className='font-bold text-lg'>Didn't get a main?</Text> 
        <TouchableOpacity className='flex flex-col'><Text className='text-lg text-yellow-400'>Send again</Text></TouchableOpacity></View>

  
    </View>
    <View style={{position:'relative', bottom:170}}>
<Button onClick={navigateToPasswordReset3} styles={{bottom:200, backgroundColor:'lightgray'}} label='Entered'/>
    <ContinueWithOauth/>
    </View>
    </SafeAreaView>
  )
}

export default Passwordreset2

const styles = StyleSheet.create({})