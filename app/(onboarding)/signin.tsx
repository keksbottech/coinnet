import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {View, TextField, Text, Button} from 'react-native-ui-lib';


const Signin = () => {
    const router = useRouter()

    const navigateToVerification = () => {
        router.push('/(onboarding)/verification')
    }
  return (
    <SafeAreaView style={{alignItems:'center',flex:1, padding:10}}>
      <View style={styles.container} >
        <PageHeader label=''/>
        <View style={styles.wrapper}>
          <Text style={{fontWeight:'700'}} className='text-3xl mt-10'>Sign in to Coinnet</Text>

          <View className='mt-20 mb-5'>
            <Text className='font-bold'>Email/Phone number</Text>
            <TextInput style={styles.input} placeholder='mobbin.cms2@gmail.com'/>
          </View>
          <View>

            <Text className='font-bold'>Password</Text>
        <View style={styles.inputWrapper}>
            <TextInput className='w-full' style={styles.input} placeholder='Enter your password' secureTextEntry={true}/>
            <AntDesign style={styles.icon} name="eyeo" size={24} color="black" />
         </View>
     </View>

     <View className='flex items-center flex-row mt-10 justify-between text-yellow-400'>
        <Text className='text-yellow-400 text-lg'>Forgotten Password</Text>
        <Text className='text-yellow-400 text-lg'>Privacy policy</Text>
     </View>

     <TouchableOpacity onPress={navigateToVerification} style={styles.button} className='bg-yellow-300 mt-20'>
        <Text>Sign in</Text>
     </TouchableOpacity>
   </View>
 </View>
</SafeAreaView>
  );
}

export default Signin;


const styles = StyleSheet.create({
    wrapper:{

    },
    inputWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        position:'relative'
    },
    icon:{
        position:'absolute',
        right:10,
        top:20,
    },
    container:{
        padding:5,
    },
    input:{
        borderWidth:.5,
        borderColor:'black',
        borderStyle:'solid',
        padding:12,
        marginTop:10,
        borderRadius:5
    },
    button:{
        backgroundColor:'yellow', 
        width:'100%', 
        paddingVertical:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        borderRadius:10
    }
})