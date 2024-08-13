import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import ProgressBar from '@/components/progress tab/ProgressTab'
import { useRouter } from 'expo-router'

const KycVerification = () => {
    const router = useRouter()

    const navigateToFacicalRecognition = () =>{
        router.push('/(onboarding)/bvnfacecapture')
    }

    
  return (
    <SafeAreaView style={{padding:10, flex:1}}>
    <View className='h-full'>
        <PageHeader label={<ProgressBar/>}/>

        <View className=' flex w-full items-center justify-center mt-10'>
            <View style={{alignItems:'center'}}>
        <Ionicons name="finger-print" size={84} color="black" className='text-yellow-600' />
            <Text className='text-3xl font-bold' style={{paddingVertical:10}}>KYC Verification</Text>
</View>
            <Text className='text-center text-xl text-gray-500' style={{marginVertical:10}}>Verify your identity! Upload a government-issued ID (Passport, driver’s license, national ID card) to complete KYC verification,secure your account and unlock full platform features.</Text>

            <View className='w-full mt-10'>
                <View>
                    <Text style={{marginBottom:10}}className='font-bold'>Enter your BVN Number</Text>
                    <Input style={{width:'100%'}} placeholder='83**********'/>
                </View>

                <View style={{marginTop:10}}>
                    <Text className='font-bold' style={{marginBottom:10}}>NIN Number</Text>
                    <Input placeholder='83**********'/>
                </View>
            </View>
            <View  style={{flexDirection:'row', marginTop:15}}>
                <TouchableOpacity style={{marginRight:5}}>
                    <Text className='text-yellow-500 font-bold'>Click Here</Text>
                </TouchableOpacity>
                <Text className='font-bold'>to upload NIN Slip</Text>
            </View>
        </View>
      <Button onClick={navigateToFacicalRecognition} label='Continue'/>
    </View>
</SafeAreaView>
  )
}

export default KycVerification

const styles = StyleSheet.create({})