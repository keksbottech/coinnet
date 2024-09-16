import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '@/hooks/useAppSelector'
import { Image } from 'react-native'
import { useRouter } from 'expo-router'
import { ThemedText } from '../ThemedText'

const SupportActionButtons = ({enableBottomDrawer}) => {
    const selectedCurrency = useAppSelector(state => state.selectedCurrency.selectedCurrency)
    const router = useRouter()
    const theme = useAppSelector(state => state.theme.theme)

    const navigateToSupport = () => {
      router.push('/(other)/support')
    }
  return (
    <View style={styles.header}>
    <TouchableOpacity onPress={enableBottomDrawer} style={styles.flagContainer}>
      <Image source={{uri:selectedCurrency?.imageUrl}} width={20} height={20}/>
      <ThemedText style={styles.flagText}>{selectedCurrency?.symbol}</ThemedText>
    </TouchableOpacity>
    <View style={styles.iconsContainer}>
      {/* <Ionicons name="globe-outline" size={24} style={styles.icon} /> */}
      <TouchableOpacity onPress={navigateToSupport}>
      <Ionicons name="headset-outline" color={theme ? 'white': 'black'} size={24} style={styles.icon} />
      </TouchableOpacity>
      {/* <Ionicons name="notifications-outline" size={24} /> */}
    </View>
  </View>
  )
}

export default SupportActionButtons

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      },
      flagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      flagText: {
       
        fontSize: 16,
        left:5
      },
      iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight: 16,
      },
})