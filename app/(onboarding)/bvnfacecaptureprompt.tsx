import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/ui/button/Button'
import BvnFaceImage from '@/assets/svg/facecaputure.svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const BvnFaceCapture = () => {
  const router = useRouter()

  const navigateToBvnFaceCaptureBox = () => {
    router.push('/(onboarding)/bvnfacecapture')
  }
  return (
    <SafeAreaView style={{flex:1, padding:10}}>
    <View className='h-full pt-20 flex flex-col items-center'>
<BvnFaceImage/>
<Text className='font-bold text-4xl mt-10'>One More Thing</Text>
      <Text className='text-center mt-10 text-xl text-gray-500'>To complete your KYC verification, please ensure that your face is clearly visible and matches the photo on your NIN and BVN. Make sure you are in a well-lit environment with a plain background. Remove any facial accessories such as glasses or hats before taking the photo.</Text>

      <Button onClick={navigateToBvnFaceCaptureBox} label='Done'/>
    </View>
    </SafeAreaView>
  )
}

export default BvnFaceCapture

const styles = StyleSheet.create({})