import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Button from '@/components/ui/button/Button'

const PasswordReset6 = () => {
  return (
    <View>
      <PageHeader/>

      <View>
        <Image/>
      </View>

      <Text>
        Congratulations
      </Text>

      <Text>You have successfully created a new password, click continue to enter the application</Text>

      <Button label='Continue'/>
    </View>
  )
}

export default PasswordReset6

const styles = StyleSheet.create({})