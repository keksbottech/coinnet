import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Button from '@/components/ui/button/Button'

const PasswordReset3 = () => {
  return (
    <View>
        <PageHeader/>

        <View>
            <View>
                <Image/>
            </View>

            <Text>Confirm your email</Text>
            <Text>We just sent you an email to tomisjkls199@gmail.com</Text>
        </View>
<View>
    <Button label='Continue'/>
    <View>
        <Text>I</Text> 
        <Text>didn't receive</Text> 
        <Text>my email</Text>
        </View>
</View>
    </View>
  )
}

export default PasswordReset3

const styles = StyleSheet.create({})