import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const LimitsAndFeatures = () => {
  return (
    <View>
      <PageHeader label='Limits and Features'/>

      <View>
        <View>
          <View>
          <AntDesign name="creditcard" size={24} color="black" />
          <Text>3D Secure Purchases</Text>
          </View>
          <Text>SGD 150/week</Text>
        </View>

        <View>
          <View>
          <FontAwesome name="send-o" size={24} color="black" />
          <Text>Send cryptocurrency</Text>
          </View>
          <Text>Enabled </Text>
        </View>

        <View>
          <View>
          <FontAwesome name="qrcode" size={24} color="black" />
          <Text>Receive cryptocurrency</Text>
          </View>
          <Text>Enabled</Text>
        </View>
      </View>
      <View>
        <Text>You currently have the highest level of account limits and features available</Text>
      </View>
    </View>
  )
}

export default LimitsAndFeatures

const styles = StyleSheet.create({})