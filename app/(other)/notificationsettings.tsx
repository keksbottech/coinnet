import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Switch } from 'tamagui'
import NotificationsScreen from '@/components/notification/Notification'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

const NotificationSettings = () => {
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Notification settings</Text>} />
        
    <View style={{paddingTop:40}}>

<NotificationsScreen/>
    </View>
    </SafeAreaView>
  )
}

export default NotificationSettings

const styles = StyleSheet.create({})