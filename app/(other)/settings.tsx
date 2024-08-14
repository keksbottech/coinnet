import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Separator, Switch } from 'tamagui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from '@/components/settings/Settings';
import { useRouter } from 'expo-router';

const Settings = () => {
    const router = useRouter()

    
  return (
    <SafeAreaView style={{padding:10}}>
    
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} other={<Feather name="search" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Settings</Text>} />
     {/* <AntDesign name="search1" size={24} color="black" /> */}


     <View style={{paddingTop:30}}>
   <SettingsScreen/>
     </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({})