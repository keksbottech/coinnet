import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const OtherLayout = () => {


  return (
    <Stack>
   <Stack.Screen name='transactioncomplete' options={{headerShown:false}}/>
   
   </Stack>
  )
}

export default OtherLayout