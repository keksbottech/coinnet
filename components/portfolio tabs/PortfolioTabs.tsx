import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PortfolioTabs = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text>Deposit</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Send</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Receive</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Withdraw</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PortfolioTabs

const styles = StyleSheet.create({})