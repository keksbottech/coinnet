import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import ProgressBar from '@/components/progress tab/ProgressTab';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loading from '@/components/loading/Loading';
import Toast from 'react-native-toast-message';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserSession } from '@/lib/store/reducers/storeUserSession';

const AuthenticationCode = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const navigateToKycVerification = async (data: { code: string }) => {
    console.log('Submitted code:', data.code);
    try{
     const {code} = data

     console.log(code)

     setIsLoading(true)

     const body = {
      userId:userData?._id,
      otp: code
     }

     console.log(body)

     const response = await axios.post('user/otp/verify', body)

     console.log(response.data)
     
     dispatch(getUserSession(response.data.message))     

     Toast.show({
      type:'success',
      text1:'Otp Verification Successful',
      text2:'Redirecting...'
    })

     setTimeout(() => {
      router.push('/(onboarding)/kycverification');
     }, 2000);
    }
    catch(err){
      console.log(err);
      if(err.response.data.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.'){
        Toast.show({
          type:'error',
          text1: 'Otp failed to send',
          text2: 'User already exists. Try another phone number to create an account',
        });
      }
      else{
        Toast.show({
          type:'error',
          text1: 'Otp failed to send',
          text2: 'Check the number or your internet connection',
        });
      }
    }
    finally{
      setIsLoading(false)
    }
  
  };


  const resendUserPhoneOtp = async() => {
    try{
    
      const body = {
        userId: userData?.userAuthId,
        phone: userData?.phone,
      };

      // console.log(userData)

      console.log(body);
  
      const sendOtp = await axios.post('user/otp/phone/send', body);

      Toast.show({
        type:'success',
        text1: 'Otp Sent Successfully',
        text2: 'Check your phone for the otp code sent to you',
      });
    }
    catch(err){
      console.log(err)
      Toast.show({
        type:'error',
        text1:'Invaild Code',
        text2:'The code you provided is invalid'
      })
    }
    finally{
      setIsLoading(false)
    }
  }


  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={{ flex: 1, position: 'relative', padding: 10 }}>
      <View className="h-full">
        <PageHeader label={<ProgressBar currentStep={2} />} />
        <Toast/>
        <View className="mt-10">
          <Text className="text-3xl" style={styles.title}>Enter authentication code</Text>
          <Text className="text-gray-500 text-xl" style={styles.text}>
            Enter the 7-digit code we just texted to your phone number
          </Text>
          <View>
            <Text className="text-xl" style={styles.title}>Code</Text>
            <Controller
              control={control}
              name="code"
              rules={{ required: 'Authentication code is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ marginTop: 10, fontFamily: 'MonsterReg' }}
                  placeholder="Authentication code"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.code && <Text style={{ color: 'red' }}>{errors.code.message}</Text>}
          </View>
        </View>

        <View style={{ flex: 1, position: 'absolute', width: '100%', bottom: 10 }}>
          <Button styles={{ position: 'relative' }} onClick={handleSubmit(navigateToKycVerification)} label="Continue" />
          <Button
            styles={{ position: 'relative', borderSolid: 0.5, borderWidth: 0.5, bottom: 10, backgroundColor: 'transparent', fontWeight: 'bold' }}
            label="Resend code"
          />
        </View>
      </View>
    </SafeAreaView>
    </>
  );
};

export default AuthenticationCode;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'MonsterBold',
  },
  text: {
    fontFamily: 'MonsterReg',
    marginVertical: 20,
    width: 300,
  },
});
