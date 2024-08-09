import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Label } from 'tamagui'
import Input from '@/components/ui/input/Input'
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/ui/button/Button'

const SendCoins = () => {
  return (
    <View>
      <PageHeader label='Send Coin'/>

      <View>
      <Text>Select Coin</Text>
      
      <View>

      </View>

      <View>
        <View>
          <Image/>
          <View>
            <Text>Bitcoin</Text>
            <Text>BTC</Text>
          </View>
        </View>

        <View>
            <Text>Available Balance</Text>
            <Text>2.23456 BTC</Text>
          </View>
      </View>

      <View>
        <View>
          <Text>Enter Address</Text>
          <Input/>
        </View>

        <Ionicons name="qr-code-outline" size={24} color="black" />
      </View>

 
        <View>
          <Text>Amount</Text>
          <Input/>
        </View>

         
        <View>
          <Text>Note</Text>
          <Input/>
        </View>

      <View>
        <View>
          <Text>Transaction fees: 0.0000 BTC</Text>
          <Text>Min: 0.000061 BTC - Max 2.00006 BTC</Text>
        </View>
      </View>

      <Button label='Confirm'/>
      </View>
    </View>
  )
}

export default SendCoins

const styles = StyleSheet.create({})