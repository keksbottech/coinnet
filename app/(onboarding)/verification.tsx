import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const verification = () => {
    const router = useRouter()

  const navigateToCreateAccount = () => {
    router.push('/(onboarding)/create-account')
  }
  return (
    <SafeAreaView style={{padding:10, justifyContent:'space-between', flexDirection:'column'}}>
     <View className='h-full'>
        <View>
        <PageHeader />

      <View className='mt-10'>
        <Text className='font-bold text-3xl'>Enter the 7-digit code we texted to +xx xxxx xx88</Text>
        <Text className='text-2xl text-gray-500 mt-10'> This extra step shows it's really you trying to sign in</Text>

        <TextInput style={styles.input} placeholder='7778995'/>
      </View>
</View>
      <View style={{bottom:20, position:'absolute', width:'100%'}} >
        <TouchableOpacity onPress={navigateToCreateAccount} style={styles.buttonSubmit}>
            <Text className='font-bold text-xl'>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHelp}>
            <Text className='font-bold text-xl'>I need help</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default verification

const styles = StyleSheet.create({
    input:{
        borderWidth:.5,
        borderColor:'black',
        borderStyle:'solid',
        padding:12,
        marginTop:20,
        borderRadius:5
    },
    buttonSubmit:{
        width:'100%',
        paddingVertical:20,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    buttonHelp:{
        width:'100%',
        paddingVertical:20,
        borderWidth:.5,
        borderColor:'black',
        borderStyle:'solid',
            justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        borderRadius:10
    }
})