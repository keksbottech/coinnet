import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import {View, TextField, Text, Button} from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';


const Signin = () => {
    const router = useRouter()
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  

    const navigateToVerification = () => {
        router.push('/(onboarding)/verification')
    }


  return (
    <SafeAreaView style={{alignItems:'center',flex:1, padding:10, backgroundColor:'#fff'}}>
      <View style={styles.container} >
        <PageHeader label=''/>
        <View style={styles.wrapper}>
          <Text style={styles.title} className='text-3xl mt-10'>Sign in to Coinnet</Text>

          <View className='mt-10 mb-5'>
            <Text style={styles.text}>Email/Phone number</Text>
            <TextInput style={styles.input} placeholder='mobbin.cms2@gmail.com'/>
          </View>
          <View>

            <Text style={styles.text}>Password</Text>
            
            <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={!oldPasswordVisible}
        />
        <TouchableOpacity
        style={styles.pwdicon}
          onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
        >
          <Ionicons
            name={oldPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
     </View>

     <View className='flex items-center flex-row mt-10 justify-between text-yellow-400'>
        <Text style={styles.text} className='text-yellow-400 text-lg'>Forgotten Password</Text>
        <Text style={styles.text} className='text-yellow-400 text-lg'>Privacy policy</Text>
     </View>

     <TouchableOpacity onPress={navigateToVerification} style={styles.button} className='bg-yellow-300 mt-20'>
        <Text style={{fontFamily:'MonsterBold'}}>Sign in</Text>
     </TouchableOpacity>
   </View>
 </View>
</SafeAreaView>
  );
}

export default Signin;


const styles = StyleSheet.create({
    wrapper:{
paddingTop:50,

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
        borderRadius:5,
        fontFamily:'MonsterReg',
        width:'100%'
    },
    button:{
        backgroundColor:'yellow', 
        width:'100%', 
        paddingVertical:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        borderRadius:10
    },
    title:{
      fontFamily:'MonsterBold'
    },
    text:{
    fontFamily:'MonsterBold'
    },
    pwdicon:{
    position:'absolute',
    right:10,
    top:25
    }
})