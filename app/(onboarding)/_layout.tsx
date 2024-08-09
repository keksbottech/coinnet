import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OnboardingLayout = () => {
  return (
    <Stack initialRouteName='kycverification'>
   <Stack.Screen name='index' options={{headerShown:false}}/>
   <Stack.Screen name='signin' options={{headerShown:false}}/>
   <Stack.Screen name='verification' options={{headerShown:false}}/>
   <Stack.Screen name='create-account' options={{headerShown:false}}/>
   <Stack.Screen name='twostepverification' options={{headerShown:false}}/>
   <Stack.Screen name='authenticationcode' options={{headerShown:false}}/>
   <Stack.Screen name='kycverification' options={{headerShown:false}}/>
   </Stack>
  )
}

export default OnboardingLayout