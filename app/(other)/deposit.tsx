import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';


const Deposit = () => {
  return (
    <View>
      <PageHeader label='Deposit'/>

      <View>
        <View>
        <Text>Deposit</Text>
        <Text>Method</Text>
        </View>

        <View>
            <Image/>
            <Image/>
            <Image/>
            <Image/>
        </View>
       
      </View>

      <View>
        <Text>Name on card</Text>
        <Input  placeholder='John Doe'/>
      </View>

      <View>
        <Text>Name on card</Text>
        <Input  placeholder='John Doe'/>
      </View>


<View>
    <Text>Card expiration</Text>
    <View>
      <View>
        <Text>Name on card</Text>
        <Input  placeholder='John Doe'/>
      </View>

      <View>
        <Text>Name on card</Text>
        <Input  placeholder='John Doe'/>
      </View>
    </View>
</View>

<View>
        <Text>Card Security Code</Text>
        <Input  placeholder='Code'/>
        <AntDesign name="questioncircleo" size={24} color="black" />
      </View>

<TouchableOpacity>
    <Text>Change Deposit Method</Text>
</TouchableOpacity>


<Button label='Confirm'/>
    </View>
  )
}

export default Deposit

const styles = StyleSheet.create({})