import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '@/components/page header/PageHeader';
import Loading from '@/components/loading/Loading';
import { axios } from '@/lib/axios';
import Toast from 'react-native-toast-message';

// Define the shape of the form data
interface FormValues {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const router = useRouter();
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

  // Define the submit handler with the form data type

  const navigateToForgottenPassword = () => router.navigate('(onboarding)/passwordreset1')

  const signInUserAndNavigateToEmailVerification: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      
      const {password, email} = data

      const body = {
        email,
        password
      }
      const response = await axios.post('user/signin', body);
      // Handle the response if needed

      Toast.show({
        type:"success",
        text1: "Login Successful",
        text2:`Welcome back ${response.data.message[0].firstName + " " + response.data.message[0].lastName}`,
        text1Style:{fontFamily:"MonsterBold", fontSize:15, fontWeight:'normal'},
        text2Style:{fontFamily:"MonsterMid", fontSize:12, textTransform:"capitalize"}
      });

      setTimeout(() => {
        router.push('/(onboarding)/verification');
      }, 3000)


    } catch (err) {
      if(err.response.data.message === 'User does not exist. Please register to gain access'){
        Toast.show({
          type:"error",
          text1: "Login Failed",
          text2:"You entered an invalid credential",
          text1Style:{fontFamily:"MonsterBold", fontSize:15, fontWeight:'normal'},
          text2Style:{fontFamily:"MonsterMid", fontSize:10}
        });
  
      }
      else if(err.response.data.message === 'AppwriteException: Invalid credentials. Please check the email and password.'){
        Toast.show({
          type:"error",
          text1: "Login Failed",
          text2:"You entered an invalid credential",
          text1Style:{fontFamily:"MonsterBold", fontSize:15, fontWeight:'normal'},
          text2Style:{fontFamily:"MonsterMid", fontSize:10}
        }); 
      }
      else{
        Toast.show({
          type:"error",
          text1: "Login Failed",
          text2:"Something went wrong... Try Again",
          text1Style:{fontFamily:"MonsterBold", fontSize:15, fontWeight:'normal'},
          text2Style:{fontFamily:"MonsterMid", fontSize:10}
        });
  
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <SafeAreaView style={{ alignItems: 'center', flex: 1, padding: 10, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <PageHeader label='' />
          <Toast />
          <View style={styles.wrapper}>
            <Text style={styles.title} className='text-3xl mt-10'>Sign in to Coinnet</Text>

            <View className='mt-10 mb-5'>
              <Text style={styles.text}>Email/Phone number</Text>
              <Controller
                control={control}
                name="email"
                rules={{ required: 'Email is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder='mobbin.cms2@gmail.com'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
            </View>

            <View>
              <Text style={styles.text}>Password</Text>
              <View style={styles.inputWrapper}>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: 'Password is required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry={!oldPasswordVisible}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
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
              {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
            </View>

            <View className='flex items-center flex-row mt-10 justify-between text-yellow-400'>
              <TouchableOpacity onPress={navigateToForgottenPassword}>
              <Text style={styles.text} className='text-yellow-400 text-lg'>Forgotten Password</Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={styles.text} className='text-yellow-400 text-lg'>Privacy policy</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSubmit(signInUserAndNavigateToEmailVerification)} style={styles.button} className='bg-yellow-300 mt-20'>
              <Text style={{ fontFamily: 'MonsterBold' }}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.wrapper}>
              <Text style={{fontFamily:'MonsterBold'}}>Don't have an account? <Link style={{color:'orangered'}} href={'(onboarding)/create-account'}>Sign up</Link> </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Signin;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  container: {
    padding: 5,
  },
  input: {
    borderWidth: .5,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 12,
    marginTop: 10,
    borderRadius: 5,
    fontFamily: 'MonsterReg',
    width: '100%'
  },
  button: {
    backgroundColor: 'yellow',
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 10
  },
  title: {
    fontFamily: 'MonsterBold'
  },
  text: {
    fontFamily: 'MonsterBold'
  },
  pwdicon: {
    position: 'absolute',
    right: 10,
    top: 25
  }
});
