import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OtherLayout = () => {


  return (
    <Stack>
   <Stack.Screen name='receivecoin' options={{headerShown:false}}/>
   <Stack.Screen name='settings' options={{headerShown:false}}/>
   <Stack.Screen name='notificationsettings' options={{headerShown:false}}/>
   <Stack.Screen name='sendcoin' options={{headerShown:false}}/> 
   <Stack.Screen name='deposit' options={{headerShown:false}}/>   
   <Stack.Screen name='changelanguage' options={{headerShown:false}}/>   
   <Stack.Screen name='limitsandfeatures' options={{headerShown:false}}/>   
   <Stack.Screen name='changepassword' options={{headerShown:false}}/>  
   <Stack.Screen name='support' options={{headerShown:false}}/>  
   <Stack.Screen name='profile' options={{headerShown:false}}/>   
   <Stack.Screen name='sharewithfriends' options={{headerShown:false}}/>  
   <Stack.Screen name='transfercoinnetuser' options={{headerShown:false}}/>  
      <Stack.Screen name='transferinput' options={{headerShown:false}}/>  
      <Stack.Screen name='confirmtransfer' options={{headerShown:false}}/>  
      <Stack.Screen name='receivemoneyfromcoinnet' options={{headerShown:false}}/>  
      <Stack.Screen name='webview' options={{headerShown:false}}/>   
      <Stack.Screen name='paywithpaystack' options={{headerShown:false}}/>
      <Stack.Screen name='paywithflutterwave' options={{headerShown:false}}/>   
      <Stack.Screen name='paywithpaypal' options={{headerShown:false}}/>     
      <Stack.Screen name='paymentmethods' options={{headerShown:false}}/>     

   </Stack>
  )
}

export default OtherLayout