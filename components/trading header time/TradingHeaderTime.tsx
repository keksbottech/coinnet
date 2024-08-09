import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HorizontalTabs from '../header tabs/HeaderTabs'
import { TouchableOpacity } from 'react-native'

const TradingHeaderTime = () => {
  return (
    <View>
       <TouchableOpacity>
        <Text>1 Hour</Text>
       </TouchableOpacity>
       <TouchableOpacity>
       <Text>1 Day</Text>
       </TouchableOpacity>
       <TouchableOpacity>
       <Text>1 Month</Text>
       </TouchableOpacity>
       <TouchableOpacity>
       <Text>1 Year</Text>
       </TouchableOpacity>
    </View>
  )
}

export default TradingHeaderTime

const styles = StyleSheet.create({})