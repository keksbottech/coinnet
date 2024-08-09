import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'

const KycVerification = () => {

    
  return (
    <SafeAreaView style={{padding:10, flex:1}}>
    <View className='h-full'>
        <PageHeader/>
        <View className=' flex w-full items-center justify-center'>
            <View>
        <Ionicons name="finger-print" size={84} color="black" />
            <Text>KYC Verification</Text>
</View>
            <Text>Verify your identity! Upload a government-issued ID (Passport, driver’s license, national ID card) to complete KYC verification,secure your account and unlock full platform features.</Text>

            <View>
                <View>
                    <Text>Enter your BVN Number</Text>
                    <Input placeholder='83**********'/>
                </View>

                <View>
                    <Text>NIN Number</Text>
                    <Input placeholder='83**********'/>
                </View>
            </View>
            <View>
                <TouchableOpacity>
                    <Text>Click Here</Text>
                </TouchableOpacity>
                <Text>to upload NIN Slip</Text>
            </View>
        </View>
      <Button label='Continue'/>
    </View>
</SafeAreaView>
  )
}

export default KycVerification

const styles = StyleSheet.create({})