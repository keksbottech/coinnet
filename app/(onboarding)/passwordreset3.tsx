import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Button from '@/components/ui/button/Button';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import Input from '@/components/ui/input/Input';
import ToggleSwitch from '@/components/switch/Switch';
import ProgressBar from '@/components/progress tab/ProgressTab';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const PasswordReset3 = () => {
  const router = useRouter()

  const navigateToPasswordReset4 = () =>{
    router.push('/(onboarding)/passwordreset4')
  }

  return (
    <SafeAreaView style={{flex:1, padding:10, justifyContent:'space-between'
    }}>

    <View className=''>
       
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<NumberStepProgress/>}/>
        
 <View style={{paddingTop:50}}>
    <Text className='font-bold text-4xl text-center'>Create a password</Text>
    <Text className='font-bold text-center text-lg' style={{marginTop:10}}>The password must be 8 characters, including 1 uppercase letter, 1 number and 1 special character.</Text>
 </View>

 <View className='mt-10'>
    <View>
    <Text className='font-bold text-lg'>Password</Text>
    <Input style={{marginTop:8}} placeholder='Password'/>
    
    </View>

    <View style={{marginTop:10}}>
   <Text className='font-bold text-lg'>Confirm Password</Text>
    <Input style={{marginTop:8}} placeholder='Confirm Password'/>
    
    </View>

<View className='flex flex-row items-center justify-between' style={{top:10}}>
    <Text className='font-bold text-lg'>Unlock with Touch ID?</Text>
<ToggleSwitch/>
</View>
  

 </View>
 <Button onClick={navigateToPasswordReset4} styles={{position:'relative', bottom:0, marginTop:50}} label='Continue'/>
 <Text className='text-center font-bold text-lg' style={{marginTop:40}}>By registering you accept our Terms & Conditions and Privacy Policy. Your data will be security encrypted with TLS</Text>

    </View>

  <View style={{paddingVertical:50}}>
    
 <ContinueWithOauth/>
  </View>
  </SafeAreaView>
  )
}

export default PasswordReset3

const styles = StyleSheet.create({})