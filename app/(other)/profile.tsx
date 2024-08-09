import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';


const Profile = () => {
  return (
    <View>
      <PageHeader label='Profile'/>
<View>
<AntDesign name="checkcircleo" size={24} color="black" />
    <Text>Verified</Text>
</View>
      <View>
      <Image/>
      <AntDesign name="camerao" size={24} color="black" />
      </View>
   
      <Text>Nate Samson</Text>

      <View>
        <Input placeholder='Dmutro Nweke'/>

        <View>
            <Text>nate@email.com</Text>
            <AntDesign name="checkcircleo" size={24} color="black" />
        </View>
      </View>

      <Button label='Logout'/>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})