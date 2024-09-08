import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Wave } from 'react-native-animated-spinkit'
import DarkBg from '../dark bg/DarkBg'
import { useAppSelector } from '@/hooks/useAppSelector'

const Loading = () => {
  const theme = useAppSelector(state => state.theme.theme)
  return (
    <>
    <DarkBg/>
    <View style={styles.container}>
    <Wave size={48} color={theme ? 'white': "black"}/>
    </View>
    </>
  )

}

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:200
    }
})