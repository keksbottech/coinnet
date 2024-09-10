import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Input from '@/components/ui/input/Input';
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { axios } from '@/lib/axios';
import Loading from '@/components/loading/Loading';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getUserForgottenEmail } from '@/lib/store/reducers/storeUserInfo';
import { ThemedText } from '@/components/ThemedText';

const Passwordreset = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const emailValue = watch('email'); // Watch the email field for changes

  const sendEmailConfirmationOtpToValidate = async (data: { email: string }) => {
    try{
      setIsLoading(true)
      const {email} = data

      console.log(email)
      
      const getUserInfo = await axios.post('user/get/info', {email, userId: userData._id})

      console.log(getUserInfo)

      const body ={
        userId:getUserInfo.data.message?.userAuthId,
        email
      }
      
      const sendOtp = await axios.post('user/otp/email/send', body)
      
      console.log(sendOtp)
      
      const updateData = {
        email: getUserInfo?.data.message.email,
        otpId: sendOtp.data.message.userId,
      }

      

      const updates = await axios.patch('user/update',{userId: getUserInfo?.data.message._id, updateData})

      console.log(updates)
      
      dispatch(getUserForgottenEmail(getUserInfo.data.message.email))

      ToastAndroid.show('Otp sent successfully!', ToastAndroid.LONG);

      setTimeout(() => {
        router.navigate('/(onboarding)/confirmationemail')
      }, 2000);
    }
    catch(err:any){
      console.log(err)
      if(err.response.data.message === 'User does not have a email or does not exist'){

        ToastAndroid.show('Failed! Email does not exist!', ToastAndroid.SHORT);

      }
      else{
        ToastAndroid.show('Failed! Something went wrong...', ToastAndroid.SHORT);

      }

    }
    finally{
      setIsLoading(false)
    }
  };

  console.log(theme)
  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={[{ flex: 1},  {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1 }}>
          <PageHeader
            icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white':"black"} />}
            label={<NumberStepProgress currentStep={1} />}
          />
<Toast/>
          <View style={styles.content}>
            <View>
              <ThemedText style={styles.title}>Password reset</ThemedText>
              <ThemedText style={styles.description}>
                Please enter your registered email address to reset your password
              </ThemedText>
            </View>

            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={24}
                color={theme ? 'white':"black"}
                style={styles.inputIcon}
              />
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={styles.input}
                    placeholder="Email address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={theme ?'#eee':'gray'}
                  />
                )}
              />
              {emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && (
                <FontAwesome5
                  name="check-circle"
                  size={24}
                  color="green"
                  style={styles.checkIcon}
                />
              )}
            </View>
            {errors.email && <ThemedText style={{ color: 'red' }}>{errors.email.message}</ThemedText>}

            <TouchableOpacity onPress={handleSubmit(sendEmailConfirmationOtpToValidate)} style={styles.button}>
              <ThemedText style={styles.buttonText}>Continue</ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.termsText}>
              By registering you accept our Terms & Conditions and Privacy Policy. Your data will be securely encrypted with TLS
            </ThemedText>

            {/* <ContinueWithOauth styles={styles.oauth} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};

export default Passwordreset;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: 'MonsterBold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'MonsterBold',
    width: 300,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    marginTop: 15,
  },
  input: {
    paddingLeft: 45,
   flex: 1,
    fontFamily: 'MonsterReg',
  },
  checkIcon: {
    position: 'absolute',
    right: 10,
    marginTop: 15,
  },
  button: {
    backgroundColor: '#eee',
    top: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 10,
  },
  termsText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 140,
    fontFamily: 'MonsterBold',
  },
  oauth: {
    top: 100,
  },
  buttonText: {
    fontFamily: 'MonsterBold',
  },
});
