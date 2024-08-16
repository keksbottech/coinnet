import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button as ThemeButton } from '@rneui/themed';
import Button from '@/components/ui/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReceiveCoin from '@/components/receive coin/ReceiveCoin';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather } from '@tamagui/lucide-icons';

const receivecoin = () => {
  return (
    <SafeAreaView style={{flex:1, padding:10}}>
                  <PageHeader icon={<FontAwesome name="angle-left" size={24} color="black" />}  label={<Text className='font-bold text-3xl'>Receive Bitcoin</Text>} />
          
    <View className='h-full' style={{marginTop:50}}>
<ReceiveCoin/>
    </View>
    </SafeAreaView>
  )
}

export default receivecoin

const styles = StyleSheet.create({})