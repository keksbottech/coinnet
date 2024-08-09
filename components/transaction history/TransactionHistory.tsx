import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const TransactionHistory = () => {
  return (
    <View>
      <View>
        <Text>ETH</Text>
        <Text>Success</Text>
        <Text>ID 03903380</Text>
      </View>

      <View>
        <View>
        <Text>Amount</Text>
        <Text>4030.32</Text>
        </View>

        <View>
        <Text>TXS</Text>
        <Text>9E89E8E...0E800EE</Text>
        </View>

        <View>
        <Text>RID</Text>
        <Text>0280W0W0W0...080E80EE</Text>
        </View>
      </View>

      <View>
        <Text>19-98-20</Text>
        <Text>12:37:42</Text>
      </View>

      <View>
        <View>
        <FontAwesome6 name="arrow-up-right-from-square" size={24} color="black" />
            <View>
                <Text>Send</Text>
                <Text>monobank</Text>
            </View>
        </View>

        <Text>$40048</Text>
      </View>
    </View>
  )
}

export default TransactionHistory

const styles = StyleSheet.create({})