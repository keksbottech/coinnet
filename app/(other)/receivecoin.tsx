import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button as ThemeButton } from '@rneui/themed';
import Button from '@/components/ui/button/Button';

const receivecoin = () => {
  return (
    <View>
      <PageHeader/>
      <View>
        <View>
        <Ionicons name="qr-code-outline" size={24} color="black" />
        </View>

        <View>
            <View>
                <Text>Wallet Address</Text>
                <Text>93830ddojjdojdojdo....odjpdodod</Text>
            </View>
            <ThemeButton title='Copy'/>
        </View>

        <Button label='Share address'/>
      </View>
    </View>
  )
}

export default receivecoin

const styles = StyleSheet.create({})