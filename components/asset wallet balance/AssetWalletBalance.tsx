import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import Select from '../select/Select'

const AssetWalletBalance = () => {
  return (
    <View>
        <View>
        <Ionicons name='eye' color={'black'}/>
      <Text>My Balance</Text>
      <Text>$2,7830.23</Text>
      <Text>+2.60%</Text>
    </View>

    <View>
        <Select/>
    </View>
</View>
  )
}

export default AssetWalletBalance

const styles = StyleSheet.create({})