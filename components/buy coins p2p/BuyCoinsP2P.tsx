import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

const BuyCoinsP2P = () => {
  return (
    <View>
      <View>
        <View>
            <Image/>
            <View>
                <View>
                    <Text>Kcee</Text>
                    <AntDesign name='check' color={'black'}/>
                </View>
                <Text>1m ago</Text>
            </View>
        </View>
        <View>
            <Text>$1,000</Text>
            <View>
                <Text>Quantity</Text>
                <Text>212.9220 USDT</Text>
            </View>
            <Text>Limits</Text>
            <Text>USDT</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
            <Text>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BuyCoinsP2P

const styles = StyleSheet.create({})