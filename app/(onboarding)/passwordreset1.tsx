import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';

const passwordreset = () => {
  return (
    <View>
        <PageHeader/>
      <View>
        <Text>Password reset</Text>
        <Text>Please enter your registered email address to reset your password</Text>
      </View>

      <View>
      <Feather name="mail" size={24} color="black" />
        <Input/>
      </View>

      <View>
        <Button label='Continue'/>
        <Text>By registering you accept our Terms & Conditions and Privacy Policy. Your data will be security encrypted with TLS</Text>
      </View>

<ContinueWithOauth/>
    </View>
  )
}

export default passwordreset

const styles = StyleSheet.create({})