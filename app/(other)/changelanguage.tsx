import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';

const ChangeLanguage = () => {
  return (
    <View>
        <PageHeader label='Change Language'/>
      <View>
        <View>
            <Image/>
            <View>
                <Text>English</Text>
                <Text> English</Text>
            </View>

        </View>
        <AntDesign name="checkcircleo" size={24} color="black" />
      </View>

      <Button label='Save'/>
    </View>
  )
}

export default ChangeLanguage

const styles = StyleSheet.create({})