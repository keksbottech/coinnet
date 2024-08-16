import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

const Verification = () => {
    const router = useRouter()

  const navigateToCreateAccount = () => {
    router.push('/(onboarding)/create-account')
  }
  return (
    <SafeAreaView style={{padding:10, justifyContent:'space-between', flexDirection:'column', backgroundColor:'white'}}>
     <View className='h-full'>
        <View>
        <PageHeader />

      <View className='mt-10'>
        <Text className='text-3xl' style={styles.title}>Enter the 7-digit code we texted to +xx xxxx xx88</Text>
        <Text className='text-xl text-gray-500 mt-10' style={styles.text}>This extra step shows it's really you trying to sign in</Text>

        <TextInput style={styles.input} placeholder='7778995'/>
      </View>
</View>
      <View style={{bottom:20, position:'absolute', width:'100%'}} >
        <TouchableOpacity onPress={navigateToCreateAccount} style={styles.buttonSubmit}>
            <Text style={styles.title} className='text-lg'>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonHelp}>
            <Text style={styles.title} className='text-lg'>I need help</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default Verification

const styles = StyleSheet.create({
    input:{
        borderWidth:.5,
        borderColor:'black',
        borderStyle:'solid',
        padding:12,
        marginTop:20,
        borderRadius:5,
        fontFamily:'MonsterReg'
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
    },
    title:{
      fontFamily:'MonsterBold'
    },
    text:{
      fontFamily:'MonsterReg',
    }
})