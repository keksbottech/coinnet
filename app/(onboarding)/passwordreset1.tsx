import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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

const Passwordreset = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()

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

      
      
      const getUserInfo = await axios.post('user/get/info', {email})

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

      Toast.show({
        type:'success',
        text1:'Otp Sent Successfully',
        text2:'Redirecting...'
      })

      setTimeout(() => {
        router.navigate('(onboarding)/confirmationemail')
      }, 2000);
    }
    catch(err){
      console.log(err)
      if(err.response.data.message === 'User does not have a email or does not exist'){
        Toast.show({
          type:'error',
          text1:'Otp Failed To Send',
          text2:'Email does not have an account...'
        })
      }
      else{
        Toast.show({
          type:'error',
          text1:'Otp Failed To Send',
          text2:'Something went wrong... Try again'
        })
  
      }

    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1 }}>
          <PageHeader
            icon={<FontAwesome name="angle-left" size={24} color="black" />}
            label={<NumberStepProgress currentStep={1} />}
          />
<Toast/>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Password reset</Text>
              <Text style={styles.description}>
                Please enter your registered email address to reset your password
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={24}
                color="black"
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
            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}

            <TouchableOpacity onPress={handleSubmit(sendEmailConfirmationOtpToValidate)} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By registering you accept our Terms & Conditions and Privacy Policy. Your data will be securely encrypted with TLS
            </Text>

            <ContinueWithOauth styles={styles.oauth} />
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
