import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Button from '@/components/ui/button/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import NumberStepProgress from '@/components/number step progress/NumberStepProgress'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import ShieldImage from '@/assets/svg/shield.svg'
import { useRouter } from 'expo-router'

const PasswordReset4 = () => {
  const router = useRouter()

  const navigateToHome = () =>{
    router.push('/(tabs)/')
  }
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<NumberStepProgress/>}/>
       
    <View className='h-full pt-20 flex flex-col items-center '>
 
      <View>
        <ShieldImage/>
      </View>

      <Text className='font-bold text-4xl'>
        Congratulations!
      </Text>

      <Text className='text-center font-bold text-lg' style={{marginTop:10}}>You have successfully created a new password, click continue to enter the application</Text>

      <Button onClick={navigateToHome} styles={{bottom:100}} label='Continue'/>
    </View>
    </SafeAreaView>
  )
}

export default PasswordReset4

const styles = StyleSheet.create({})