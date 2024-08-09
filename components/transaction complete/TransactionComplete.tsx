import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const TransactionComplete = () => {
  return (
    <View>
        <FontAwesome6 name="check-circle" size={24} color="black" />
        
      <Text>Exchange Successful</Text>
      <Text>You have successfully initiated the transaction. Amount will reflect in wallet within 1 hour</Text>

      <View>
        <View>
            <Text>Bitcoin BTC</Text>
            <Text>0.0401030</Text>
        </View>

<View>
<AntDesign name="arrowright" size={24} color="black" />
</View>

<View>
            <Text>Ethereum ETH</Text>
            <Text>0.0401030</Text>
        </View>
        
      </View>
    </View>
  )
}

export default TransactionComplete

const styles = StyleSheet.create({})