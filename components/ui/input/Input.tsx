import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

type InputPropTypes ={
    style?: {},
    placeholder?: string
}
const Input = ({style,placeholder}:InputPropTypes) => {
  return (
      <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}/>

  )
}

export default Input

const styles = StyleSheet.create({
    input:{
        borderColor:'black',
        borderWidth:.5,
        borderStyle:'solid',
        padding:10,
    }
})