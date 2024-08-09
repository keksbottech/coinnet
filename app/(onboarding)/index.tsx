import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Href, useRouter } from 'expo-router';
import { Button } from '@/tamagui.config';
const OnboardingScreen = () => {
  const router = useRouter()


  const navigateToSignin = () =>{
    router.push("/(onboarding)/signin")
  }
  return (
    <SafeAreaView style={{flex:1}}>
          <View className='flex items-center justify-center bg-yellow-300 flex-col h-full'>
      <Image 
        source={require('@/assets/images/logo/logo.png')} 
        style={{ width: 150, height: 150 }} // Provide width and height for the image
      />

        <TouchableOpacity style={styles.button} onPress={navigateToSignin}>
 <Text className='font-bold text-xl'>   Get Started</Text>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  button:{
    backgroundColor:'white',
    width:'90%',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:20,
    position:'absolute',
    bottom:100,
    borderRadius:10,
    
  }
 
})