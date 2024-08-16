import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type ButtonPropTypes = {
    label?: string;
    styles?: {};
    onClick?: () => void
}
const Button = ({label, styles, onClick}:ButtonPropTypes) => {
  return (
 <TouchableOpacity onPress={onClick} style={[style.button, styles]}>
    <Text style={style.text} className='text-xl'>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button

const style = StyleSheet.create({
    button:{
        alignItems:'center',
        justifyContent:'center',
        width:'100%',
        paddingVertical:20,
        backgroundColor:'yellow',
        borderRadius:10,
        position:'absolute',
        bottom:30,
    },
    text:{
      fontFamily:'MonsterBold'
    }
})