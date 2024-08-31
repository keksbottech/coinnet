import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import LanguageSelector from '@/components/change language/ChangeLanguage';

const ChangeLanguagePage = () => {
  return (
    <SafeAreaView style={{padding:10,flex:1}}>
                  <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text style={styles.label}>Change Language</Text>} />
          
    <View  style={{paddingTop:30, height:'100%'}}>
      <LanguageSelector/>
      <Button styles={{bottom:50}} label='Save'/>
    </View>
    </SafeAreaView>
  )
}

export default ChangeLanguagePage

const styles = StyleSheet.create({
  label:{
    fontFamily:'MonsterBold',
    fontSize:20
  }
})