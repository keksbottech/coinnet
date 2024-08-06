import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@rneui/themed';
const OnboardingScreen = () => {
  return (
    <SafeAreaView>
        <Image src={'@/assets/logo/logo.png'} width={100} height={100} alt='logo'/>
        <Button title={'Get Started'}/>
    </SafeAreaView>
  )
}

export default OnboardingScreen