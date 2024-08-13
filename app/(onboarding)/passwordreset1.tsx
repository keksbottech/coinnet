import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Passwordreset = () => {
  const router = useRouter()

  const navigateToEmailSentLetter = () => {
    router.push('/(onboarding)/confirmationemail')
  }


  return (
    <SafeAreaView style={{padding:10, flex:1, backgroundColor:'white'}}>
  <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<NumberStepProgress/>}/>
        
    <View className='flex flex-col items-center h-full' style={{paddingTop:5}}>
   
      <View>
        <Text className='font-bold text-4xl text-center'>Password reset</Text>
        <Text className='text-center text-xl font-bold ' style={{width:300,marginTop:10}}>Please enter your registered email address to reset your password</Text>
      </View>

      <View className='w-full flex flex-row items-center relative'>
      <Feather name="mail" size={24} color="black"  style={{position:'absolute', marginTop:30, left:10}}/>
        <Input style={{paddingLeft:45, flex:1}} placeholder='Email address'/>
        <FontAwesome5 name="check-circle" size={24} color="green"  style={{position:'absolute', marginTop:10, right:10}}  />
      </View>

      <View style={{position:'absolute', bottom:50}}>
        <Button onClick={navigateToEmailSentLetter} styles={{backgroundColor:'#eee', bottom:220}} label='Continue'/>
        <Text className='text-center text-xl font-bold' style={{bottom:50}}>By registering you accept our Terms & Conditions and Privacy Policy. Your data will be security encrypted with TLS</Text>
     

<ContinueWithOauth styles={{bottom:0}}/>
</View>

    </View>
    </SafeAreaView>
  )
}

export default Passwordreset

const styles = StyleSheet.create({})