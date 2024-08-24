import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DarkBg = () => {
  return (
    <View style={styles.container}>
    </View>
  )
}

export default DarkBg

const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgba(0,0,0,.2)',
        zIndex:10,
        position:'absolute',
        bottom:0,
        top:0,
        left:0,
        right:0
    },
    
})