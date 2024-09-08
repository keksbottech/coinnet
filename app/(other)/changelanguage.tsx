import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import LanguageSelector from '@/components/change language/ChangeLanguage';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const ChangeLanguagePage = () => {
  const theme = useAppSelector(state => state.theme.theme)

  return (
    <SafeAreaView style={[{padding:10,flex:1}, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
                  <PageHeader icon={<FontAwesome name="angle-left" size={24} color={theme? 'white': "black"} />} label={<ThemedText style={styles.label}>Change Language</ThemedText>} />
          
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