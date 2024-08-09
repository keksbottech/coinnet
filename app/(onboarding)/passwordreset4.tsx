import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Entypo from '@expo/vector-icons/Entypo';
import { Input } from '@rneui/themed';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';

const PasswordReset4 = () => {
  return (
    <SafeAreaProvider>
        <SafeAreaView>
    <View>
      <PageHeader/>

      <View>
        <Text>Please enter the code</Text>
        <Text>We sent email to tomododj@kd.com</Text>
      </View>

      <View>
      <Entypo name="mail" size={24} color="black" />
      </View>

      <View>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
        <Input/>
      </View>

      <Text>Didn't get a main? <TouchableOpacity><Text>Send again</Text></TouchableOpacity></Text>
    </View>

    <ContinueWithOauth/>
    </SafeAreaView>
</SafeAreaProvider>
  )
}

export default PasswordReset4

const styles = StyleSheet.create({})