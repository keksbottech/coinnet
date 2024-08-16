import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import ChangePassword from '@/components/change password/ChangePassword'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

const ChangePasswordPage = () => {
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Change Password</Text>} />
        
    <View className='h-full' style={{paddingTop:50}}>
        <ChangePassword/>

        <Button styles={{bottom:50}} label='Change password'/>
    </View>
    </SafeAreaView>
  )
}

export default ChangePasswordPage

const styles = StyleSheet.create({})