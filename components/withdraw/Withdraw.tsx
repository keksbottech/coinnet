import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Select from '../select/Select'
import Ionicons from '@expo/vector-icons/Ionicons'
import Input from '../ui/input/Input'

const Withdraw = () => {
  return (
    <View>
      <Text>Your withdraw</Text>
      <Text>$400</Text>

      <View>
        <Text>Available Balance</Text>
        <View>
            <View>
                <Text>Quantity</Text>
                <Text>2,763.23</Text>
            </View>
            <Text>USD</Text>
        </View>
      </View>
      <View>
        <Text>Withdraw to</Text>
        <View>
           <Ionicons name='home' color={'black'}/>
            <Select/>
        </View>
      </View>

      <View>
        <Text>Available Balance</Text>
        <View>
           <Ionicons name='home' color={'black'}/>
            <Input/>
        </View>
      </View>
    </View>
  )
}

export default Withdraw

const styles = StyleSheet.create({})