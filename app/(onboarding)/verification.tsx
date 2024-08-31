import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PageHeader from '@/components/page header/PageHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loading from '@/components/loading/Loading';
import Toast from 'react-native-toast-message';
import { axios } from '@/lib/axios';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserOtpId } from '@/lib/store/reducers/storeUserInfo';
import { getUserSession } from '@/lib/store/reducers/storeUserSession';
import Button from '@/components/ui/button/Button';

const Verification = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
    },
  });
  const [otpId, setOtpId] = useState('');

  useEffect(() => {
    sendPhoneConfirmationOtpToValidate();
  }, []);

  const formatPhoneNumber = () => {
    return userData?.phone.replace(/(\d{2})(\d{4})(\d{2})/, '$1 xxxx xx$3');
  };

  const sendPhoneConfirmationOtpToValidate = async () => {
    try {
      setIsLoading(true);
      const body = {
        userId: userData?.userAuthId,
        phone: userData?.phone,
      };

      const sendOtp = await axios.post('user/otp/phone/send', body);
      setOtpId(sendOtp.data.message.userId);
      
      Toast.show({
        type: 'success',
        text1: 'Otp Sent Successfully',
        text2: 'Check your phone for the otp code sent to you',
      });

    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.') {
        Toast.show({
          type: 'error',
          text1: 'Otp failed to send',
          text2: 'User already exists. Try another phone number to create an account',
        });
      } else if (err.response.data.message === 'Phone number already in use by another user') {
        Toast.show({
          type: 'error',
          text1: 'Otp failed to send',
          text2: 'Phone number already in use by another user',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Otp failed to send',
          text2: 'Check the number or your internet connection',
        });
      }

    } finally {
      setIsLoading(false);
    }
  };

  const navigateToCreateAccount = () => {
    router.push('/(onboarding)/create-account');
  };

  const onSubmit = async (data: any) => {
    const { code } = data;
    try {
      setIsLoading(true);
      const body = {
        userId: otpId,
        otp: code,
      };

      const response = await axios.post('user/otp/verify', body);

      dispatch(getUserSession(response.data.message));

      Toast.show({
        type: 'success',
        text1: 'Otp Verification Successful',
        text2: 'Redirecting...',
      });

      setTimeout(() => {
        router.push('/(tabs)');
      }, 2000);
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.') {
        Toast.show({
          type: 'error',
          text1: 'Otp failed to send',
          text2: 'User already exists. Try another phone number to create an account',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Otp failed to send',
          text2: 'Check the number or your internet connection',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      {isLoading && <Loading />}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <PageHeader />
          <Toast />
          <View style={styles.content}>
            <Text style={styles.title}>Enter the 7-digit code we texted to {formatPhoneNumber()}</Text>
            <Text style={styles.text}>This extra step shows it's really you trying to sign in</Text>

            <Controller
              control={control}
              rules={{
                required: 'Verification code is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Code must be 6 digits',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.code && styles.inputError]}
                  placeholder='******'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType='numeric'
                />
              )}
              name="code"
            />
            {errors.code && <Text style={styles.errorText}>{errors.code.message}</Text>}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.buttonSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendPhoneConfirmationOtpToValidate} style={styles.buttonSubmit}>
              <Text style={styles.buttonText}>Resend Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonHelp}>
              <Text style={styles.buttonText}>I need help</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  safeArea: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'MonsterBold',
  },
  text: {
    fontSize: 18,
    color: '#6B6B6B',
    fontFamily: 'MonsterReg',
    marginTop: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 12,
    marginTop: 20,
    borderRadius: 5,
    fontFamily: 'MonsterReg',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'MonsterBold',
    marginTop: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  buttonSubmit: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#F9C74F', // equivalent to bg-yellow-300
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop:10
  },
  buttonHelp: {
    width: '100%',
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
  },
});
