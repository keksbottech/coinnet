import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OnboardingLayout = () => {


  return (
    <Stack initialRouteName='passwordreset4'>
   <Stack.Screen name='index' options={{headerShown:false}}/>
   <Stack.Screen name='signin' options={{headerShown:false}}/>
   <Stack.Screen name='verification' options={{headerShown:false}}/>
   <Stack.Screen name='create-account' options={{headerShown:false}}/>
   <Stack.Screen name='twostepverification' options={{headerShown:false}}/>
   <Stack.Screen name='authenticationcode' options={{headerShown:false}}/>
   <Stack.Screen name='kycverification' options={{headerShown:false}}/>
   <Stack.Screen name='bvnfacecapture' options={{headerShown:false}}/>
   <Stack.Screen name='bvnfacecaptureprompt' options={{headerShown:false}}/>
   <Stack.Screen name='alldone' options={{headerShown:false}}/>
   <Stack.Screen name='passwordreset1' options={{headerShown:false}}/>
   <Stack.Screen name='confirmationemail' options={{headerShown:false}}/>
   <Stack.Screen name='passwordreset2' options={{headerShown:false}}/>
   <Stack.Screen name='passwordreset3' options={{headerShown:false}}/>
   <Stack.Screen name='passwordreset4' options={{headerShown:false}}/>

   </Stack>
  )
}

export default OnboardingLayout