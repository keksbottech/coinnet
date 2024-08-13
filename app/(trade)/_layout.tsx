import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TradeLayout = () => {


  return (
    <Stack>
   <Stack.Screen name='transactioncomplete' options={{headerShown:false}}/>
   <Stack.Screen name='buytrading' options={{headerShown:false}}/>
   <Stack.Screen name='confirmbuy' options={{headerShown:false}}/>
   <Stack.Screen name='confirmexchange' options={{headerShown:false}}/>
   <Stack.Screen name='exchangecoin' options={{headerShown:false}}/>
   
   <Stack.Screen name='selltradingcoin' options={{headerShown:false}}/>
   <Stack.Screen name='transactionauthenticationcode' options={{headerShown:false}}/>
   <Stack.Screen name='transactionhistory' options={{headerShown:false}}/>
   </Stack>
  )
}

export default TradeLayout