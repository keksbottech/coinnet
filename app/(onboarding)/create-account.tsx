import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '@/components/ui/input/Input'
import { useRouter } from 'expo-router'
import Button from '@/components/ui/button/Button'
import ProgressBar from '@/components/progress tab/ProgressTab'
import CheckboxWithLabel from '@/components/ui/checkbox/Checkbox'

const CreateAccount = () => {
    const router = useRouter()

    const navigateTo2StepVerification = () => {
        router.push('/(onboarding)/twostepverification')
    }
  return (
    <SafeAreaView style={{padding:10, flex:1}}>
     <View className='mt-5 h-full'>
        <View className='mt-5'>
        <PageHeader label={
        <ProgressBar/>}/>


        </View>
      <Text className='font-bold text-3xl mt-10'>Create your account</Text>

      <View className='mt-10'>
        <View className='mt-5'>
            <Text className='font-bold text-xl'>First Name</Text>
            <Input placeholder='Mobbin'/>
        </View>

        <View className='mt-5'>
            <Text className='font-bold text-xl'>Last Name</Text>
            <Input placeholder='Mobbin'/>
        </View>

        <View className='mt-5'>
            <Text className='font-bold text-xl'>Email</Text>
            <Input placeholder='mobbin.cms2@gmail.com'/>
        </View>

        <View className='mt-5'>
            <Text className='font-bold text-xl'>Password</Text>
            <Input placeholder='XXXXXXXXXX'/>
        </View>

        <View className='mt-5'>

<CheckboxWithLabel label={
 <Text>
  I certify that I am 18 years of age or older, and I agree to the User Agreement and Privacy Policy
 </Text>
}/>
<Text></Text>
        </View>

      </View>

      
      <Button onClick={navigateTo2StepVerification} label='Start'/>
    </View>
    
    </SafeAreaView>
  )
}

export default CreateAccount