import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';
import ProfileScreen from '@/components/profile/Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';


const Profile = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />}  label={<Text className='font-bold text-3xl'>Profile</Text>} />
          
  
    <View style={{paddingTop:30,padding:10}} className='h-full'>
<ProfileScreen/>
    </View>
  </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})