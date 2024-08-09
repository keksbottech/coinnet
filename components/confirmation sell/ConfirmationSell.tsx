import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Separator } from 'tamagui'
import Button from '../ui/button/Button'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'

const ConfirmationSell = () => {
  return (
    <View>
      <Text>You Buy</Text>
      <Text>0.000444</Text>

      <View>
        <Text>You Receive</Text>

        <View>
            <View>
                <Text>Quantity</Text>
                <Text>0.684848</Text>
            </View>
            <Text>BTC</Text>
        </View>

<View>
    <Text>Payment Method Available</Text>
    <View>
        <AntDesign name='home' color={'black'}/>
        <View>
            <View>
                <Text>Coinnet Wallet</Text>
                <Text>xxxx92993</Text>
            </View>
            <AntDesign name='arrowdown' color={'black'}/>
        </View>
    </View>
</View>
        <View>
            <View>
                <Text>Amount</Text>
                <Text> 0.303030 BTC $1000</Text>
            </View>
<Separator/>
            <View>
                <Text>Transaction Fees (0.5%)</Text>
                <Text>$1.0</Text>
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

export default ConfirmationSell 
const styles = StyleSheet.create({})