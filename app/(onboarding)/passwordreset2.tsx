import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const PasswordReset2 = () => {
  return (
    <View>
        <PageHeader/>
      <View>
        <Text>Password reset</Text>
        <Text>Please enter your registered email address to reset your password</Text>
      </View>

      <View>
        <Text>Email address</Text>
      <Feather name="mail" size={24} color="black" />
        <Input/>
        <Feather name="check" size={24} color="black" />
      </View>

<Button label='Continue'/>

    </View>
  )
}

export default PasswordReset2

const styles = StyleSheet.create({})