import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Button from '../ui/button/Button'

const ExchangeCrypto = () => {
  return (
    <View>
        <View>
            <Text>You Convert</Text>
            <Text>$1.000</Text>
        </View>
        <View>
            <Text>You Receive</Text>
            <View>
                <View>
                <Text>Quantity</Text>
                <Text>0.68958</Text>
                </View>
                <Text>ETH</Text>
            </View>
        </View>

<View>
    <Text>Exchange</Text>
    <View>
        <View>
            <Image/>

            <View>
                <Text>From</Text>
                <Text>Bitcoin</Text>
            </View>
        </View>
        <View>
            <AntDesign name='reload1' color={'black'}/>
        </View>
        <View>
<View>
    <Text>From</Text>
    <Text>Bitcoin</Text>
</View>
<Image/>

        </View>
    </View>
</View>

      <Button label='Buy'/>
    </View>
  )
}

export default ExchangeCrypto

const styles = StyleSheet.create({})