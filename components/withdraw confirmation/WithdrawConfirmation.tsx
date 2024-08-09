import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../ui/button/Button'
import { Separator } from 'tamagui'

const WithdrawConfirmation = () => {
  return (
    <View>
      <View>
        <Text>Bank Account </Text>
        <Text>monobank </Text>
      </View>
      <Separator/>
      <View>
        <Text>Account Number </Text>
        <Text>08389383939</Text>
      </View>
      <Separator/>
      <View>
        <Text>Account Name </Text>
        <Text>Nweke chisom</Text>
      </View>
      <Separator/>
      <View>
        <Text>Withdrawal Amount </Text>
        <Text>$400</Text>
      </View>
      <Separator/>
      <View>
        <Text>Transaction fee (2%)</Text>
        <Text>$8.0</Text>
      </View>
      <Separator/>
      <View>
        <Text>Total Withdrawal Amount </Text>
        <Text>$408</Text>
      </View>

      <Button label='Withdraw'/>
    </View>
  )
}

export default WithdrawConfirmation

const styles = StyleSheet.create({})