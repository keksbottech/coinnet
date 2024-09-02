import React, { useCallback, useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Text, SafeAreaView, ToastAndroid, BackHandler } from 'react-native';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import PageHeader from '@/components/page header/PageHeader';
import Loading from '@/components/loading/Loading';
import { axios } from '@/lib/axios';
import Toast from 'react-native-toast-message';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserInfo } from '@/lib/store/reducers/storeUserInfo';

// Define the shape of the form data
interface FormValues {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const router = useRouter();
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

  useFocusEffect(
  useCallback(() => {
      const onBackPress = () => {
        // Prevent back navigation
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );
  const navigateToForgottenPassword = () => router.navigate('/(onboarding)/passwordreset1');

  const signInUserAndNavigateToEmailVerification: SubmitHandler<FormValues> = async (data) => {
    try {
      
      setIsLoading(true);

      const { password, email } = data;

      const body = {
        email,
        password,
      };

      const response = await axios.post('user/signin', body);

      console.log(response.data)
      dispatch(getUserInfo(response.data.message[0]));

      ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);


      setTimeout(() => {
        router.push('/(onboarding)/verification');
      }, 3000);
    } catch (err: any) {
      let errorMessage = 'Something went wrong... Try Again';
      if (err.response.data.message === 'User does not exist. Please register to gain access' ||
          err.response.data.message === 'AppwriteException: Invalid credentials. Please check the email and password.') {
        errorMessage = 'You entered an invalid credential';
      }

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
        text1Style: { fontFamily: 'MonsterBold', fontSize: 15, fontWeight: 'normal' },
        text2Style: { fontFamily: 'MonsterMid', fontSize: 10 },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Toast />
          <View style={styles.wrapper}>
            <Text style={styles.title}>Sign in to Coinnet</Text>


            <View style={[styles.inputContainer, {marginTop:50}]}>
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
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
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
                  style={styles.pwdIcon}
                  onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
                >
                  <Ionicons
                    name={oldPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>

            <View style={styles.linkContainer}>
              <TouchableOpacity onPress={navigateToForgottenPassword}>
                <Text style={styles.linkText}>Forgotten Password</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.linkText}>Privacy policy</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSubmit(signInUserAndNavigateToEmailVerification)} style={styles.button}>
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? <Link style={styles.signupLink} href={'/(onboarding)/create-account'}>Sign up</Link></Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Signin;

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop:20
  },
  wrapper: {
    paddingTop: 50,
  },
  title: {
    fontFamily: 'MonsterBold',
    fontSize: 24, // equivalent to text-3xl
    marginTop: 10,
    textAlign: 'left',
  },
  text: {
    fontFamily: 'MonsterBold',
    fontSize: 16, // equivalent to text-lg
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    padding: 12,
    marginTop: 10,
    fontFamily: 'MonsterReg',
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  pwdIcon: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  errorText: {
    color: 'red',
  },
  button: {
    backgroundColor: '#F9C74F', // equivalent to bg-yellow-300
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'MonsterBold',
    color:'white'
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  linkText: {
    color: '#F9C74F', // equivalent to text-yellow-400
    fontSize: 16, // equivalent to text-lg
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontFamily: 'MonsterBold',
  },
  signupLink: {
    color: '#F9C74F'
  },
});
