import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LimitsAndFeatures from '@/components/limits and features/LimitsAndFeatures';
import { SafeAreaView } from 'react-native-safe-area-context';

const LimitsAndFeaturesPage = () => {
  return (
    <SafeAreaView style={{padding:10,flex:1}}>
    <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />} label={<Text className='font-bold text-3xl'>Limits and Features</Text>} />

    <View style={{paddingTop:30}}>
  <LimitsAndFeatures/>
    </View>

  </SafeAreaView>
  )
}

export default LimitsAndFeaturesPage

const styles = StyleSheet.create({})