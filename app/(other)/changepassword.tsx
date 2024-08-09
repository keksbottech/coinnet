import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'

const ChangePassword = () => {
  return (
    <View>
        <PageHeader label='Change Password'/>

        <View>
            <Input placeholder='Old Password'/>
            <Input placeholder='New Password'/>
            <Input placeholder='Confirm Password'/>
        </View>
      <Button label='Save'/>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})