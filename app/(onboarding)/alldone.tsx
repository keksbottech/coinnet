import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';
import CheckImage from '@/assets/svg/check.svg'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const AllDoneAccountCreation = () => {
  const router = useRouter()

  const navigateToPasswordReset = () =>{
    router.push('(tabs)')
  }
  return (
    <SafeAreaView style={{flex:1, padding:10, backgroundColor:'white'}}>
    <View className='flex  pt-20 h-full flex-col items-center'>
      <CheckImage/>

<View>
  
<Text className='text-center text-3xl mt-10' style={{fontFamily:'MonsterBold'}}>All done</Text>
<Text className=' text-xl text-gray-500 text-center' style={{width:300, marginTop:10, fontFamily:'MonsterReg'}}>Congrulations! Your account has been successfully added</Text>
</View>

<Button onClick={navigateToPasswordReset} label='Done'/>
    </View>
  </SafeAreaView>
  )
}

export default AllDoneAccountCreation

const styles = StyleSheet.create({})