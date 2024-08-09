import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Feather from '@expo/vector-icons/Feather';
import Input from '@/components/ui/input/Input';
import { TextArea } from 'tamagui';
import Button from '@/components/ui/button/Button';

const Support = () => {
  return (
    <View>
        <PageHeader label='Support'/>

        <View>
            <Text>Contact us for Cinnet</Text>
            <Text>Address</Text>

            <Text>House# 72, Road# 21, Banani, Dhaka-1213 (near Banani Bidyaniketon School &
 College, beside University of Nigeria) </Text>

<View>
    <Feather name="phone" size={24} color="black" />
    <Text>Call : 13301 (24/7)</Text>
</View>

  
                <View>
                <Feather name="mail" size={24} color="black" />
                    <Text>Email: support@coinnet.com</Text>
                </View>
          
        </View>

        <Text>Send message</Text>
      <View>
        <Input placeholder='Name'/>
        <Input placeholder='Email'/>

        <View>
            
            <Text>+234</Text>
            <Input placeholder='Your mobile number'/>
        </View>
<Input placeholder='Write your text'/>

<Button label='Send Message'/>
      </View>
    </View>
  )
}

export default Support

const styles = StyleSheet.create({})