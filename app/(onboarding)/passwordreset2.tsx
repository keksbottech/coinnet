import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid, BackHandler } from 'react-native';
import React, { useRef, useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import Input from '@/components/ui/input/Input';
import OTPInput from '@/components/input otp/InputOtp';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MailTwo from '@/assets/svg/mail1.svg';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import Toast from 'react-native-toast-message';
import { axios } from '@/lib/axios';
import Loading from '@/components/loading/Loading';
import { TextInput } from 'react-native';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserSession } from '@/lib/store/reducers/storeUserSession';
import { getUserInfo } from '@/lib/store/reducers/storeUserInfo';
import { ThemedText } from '@/components/ThemedText';
import { useFocusEffect } from '@react-navigation/native';

const Passwordreset2 = () => {
  const router = useRouter();
  const userData = useAppSelector(state => state.user.user)
  const [isLoading, setIsLoading] = useState(false)
  const otpInputRef = useRef<TextInput[]>([]);
  const [otpValue, setOtpValue] = useState(null);
  const userEmail = useAppSelector(state => state.user.userForgottenEmail)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)

  const handleOtpChange = (otp: any) => {
    setOtpValue(otp);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Prevent back navigation
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );


  const navigateToPasswordReset3 = async () => {
    try{
        if(!otpValue) {
         
        Toast.show({
          type:'error',
          text1:'Empty Input',
          text2:'The input should not be empty.'
        }) 
        }
        else{

        
        setIsLoading(true)

        const getUserInfoDetails = await axios.post('user/get/info', {email: userEmail})

        const body = {
          userId:getUserInfoDetails.data.message?.otpId,
          otp: otpValue
         }
    
        const verifyOtp = await axios.post('user/otp/verify', body)

        dispatch(getUserInfo(getUserInfoDetails.data.message))
         
        dispatch(getUserSession(verifyOtp.data.message))

        ToastAndroid.show('Otp verified successfully!', ToastAndroid.SHORT);


        
        setTimeout(() => {
          router.push('/(onboarding)/passwordreset3');
        }, 2000);
      }
    }
    catch(err){
      console.log(err)
      ToastAndroid.show('Failed! Invalid Otp', ToastAndroid.SHORT);

    }
    finally{
      setIsLoading(false)
    }
  };


  const resendEmailOtpForConfirmation =  async () => {
    try{
      setIsLoading(true)
    
      const body :any={
   email: userData?.email
      }

      const sendOtp = await axios('user/otp/email/send', body)

      ToastAndroid.show('Otp sent successfully!', ToastAndroid.SHORT);

      setTimeout(() => {
        router.navigate('/(onboarding)/confirmationemail')
      }, 2000);
    }
    catch(err){
      // console.log(err)
      
      ToastAndroid.show('Failed! Something went wrong. Try again', ToastAndroid.SHORT);


    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={[{ flex: 1, padding: 10},  {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PageHeader
            icon={<FontAwesome name="angle-left" size={24} color={theme?'white':"black"} />}
            label={<NumberStepProgress currentStep={2}/>}
          />
          <Toast/>

          <View style={styles.content}>
            <View>
              <ThemedText style={styles.title}>Please enter the code</ThemedText>
              <ThemedText style={styles.subtitle}>
                We sent an email to {userData?.email}
              </ThemedText>
            </View>

            <View style={styles.mailIconContainer}>
              <MailTwo />
            </View>

            <View style={styles.otpContainer}>
              <OTPInput ref={otpInputRef} onOtpChange={handleOtpChange}/>
            </View>

            <View style={styles.resendContainer}>
              <ThemedText style={styles.resendText}>Didn't get an email?</ThemedText>
              <TouchableOpacity onPress={resendEmailOtpForConfirmation}>
                <ThemedText style={styles.resendLink}>Send again</ThemedText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={navigateToPasswordReset3} style={styles.button}>
  <ThemedText style={styles.buttonText}>Submit</ThemedText>
</TouchableOpacity>
      

            {/* <ContinueWithOauth styles={styles.oauth} /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};

export default Passwordreset2;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily:'MonsterBold'
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
        fontFamily:'MonsterBold'
  },
  mailIconContainer: {
    marginTop: 20,
  },
  otpContainer: {
    marginTop: 20,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    fontFamily:'MonsterBold'
  },
  resendLink: {
    fontSize: 14,
    color: 'orangered',
    marginLeft: 5,
        fontFamily:'MonsterBold'
  },
  button: {
    backgroundColor: 'lightgray',
    top: 50,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20,
    borderRadius:10,
    
  },
  oauth: {
    top: 150,
  },
    buttonText:{
    fontFamily:'MonsterBold'
  }
});
