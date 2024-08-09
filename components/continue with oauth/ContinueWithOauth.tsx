import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import AntDesign from '@expo/vector-icons/AntDesign'

const ContinueWithOauth = () => {
  return (
  
    <View>
    <View>
        <View></View>
        <Text>or continue with</Text>
        <View></View>
    </View>
    <TouchableOpacity>
    <EvilIcons name="sc-facebook" size={24} color="black" />
    </TouchableOpacity>

    <TouchableOpacity>
    <AntDesign name="apple1" size={24} color="black" />
    </TouchableOpacity>      
    
      <TouchableOpacity>
    <AntDesign name="google" size={24} color="black" />
    </TouchableOpacity>

  </View>
  )
}

export default ContinueWithOauth

const styles = StyleSheet.create({})