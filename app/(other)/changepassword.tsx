import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Input from '@/components/ui/input/Input'
import Button from '@/components/ui/button/Button'
import ChangePassword from '@/components/change password/ChangePassword'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

const ChangePasswordPage = () => {
  return (
    <SafeAreaView style={{flex:1,padding:10}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text style={styles.label}>Change Password</Text>} />
        
    <View  style={{paddingTop:50, height:'100%'}}>
        <ChangePassword/>


    </View>
    </SafeAreaView>
  )
}

export default ChangePasswordPage

const styles = StyleSheet.create({
  label:{
    fontFamily:'MonsterBold',
    fontSize:20
  }
})