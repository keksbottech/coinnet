import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Separator } from 'tamagui'
import Button from '../ui/button/Button'

const ConfirmationExchange = () => {
  return (
    <View>
      <Text>You Convert</Text>
      <Text>$1.000</Text>

      <View>
        <Text>You Receive</Text>

        <View>
            <View>
                <Text>Quantity</Text>
                <Text>0.684848</Text>
            </View>
            <Text>ETH</Text>
        </View>

        <View>
            <Text>Order</Text>
            <View>
                <Text>Form</Text>
                <Text>Bitcoin 0.303030BTC</Text>
            </View>
<Separator/>
            <View>
                <Text>To</Text>
                <Text>Ethereum 0.303030ETH</Text>
            </View>
            <Separator/>
            <View>
                <Text>Transaction Fees (0.0%)</Text>
                <Text>$0.0</Text>
            </View>
            <Separator/>
            <View>
                <Text>Total</Text>
                <Text>0.303030 BTC $1.02920</Text>
            </View>
        
        </View>
      </View>

      <Button label='Buy'/>
    </View>
  )
}

export default ConfirmationExchange 
const styles = StyleSheet.create({})