import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

type InputPropTypes ={
    style?: {},
    placeholder?: string
}
const Input = ({style,placeholder,secureTextEntry, onSubmit, onBlur, value, onChangeText}:InputPropTypes) => {
    console.log(value,'dkd')
  return (
      <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      onChangeText={onChangeText}
      value={`${value}`}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      onEndEditing={onSubmit}
      />

  )
}

export default Input

const styles = StyleSheet.create({
    input:{
        borderColor:'black',
        borderWidth:.5,
        borderStyle:'solid',
        padding:10,
        fontFamily:'MonsterReg'
    }
})