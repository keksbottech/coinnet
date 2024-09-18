import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
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
import { ThemedText } from '@/components/ThemedText';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

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
  const theme = useAppSelector(state => state.theme.theme);
  const [otpId, setOtpId] = useState('');

  useEffect(() => {
    sendPhoneConfirmationOtpToValidate();
  }, []);

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
  
      ToastAndroid.show('OTP sent successfully!', ToastAndroid.LONG);

    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.') {
        ToastAndroid.show('Failed! User already exists', ToastAndroid.SHORT);

      } else if (err.response.data.message === 'Phone number already in use by another user') {

        ToastAndroid.show('Failed! Phone number already in use', ToastAndroid.SHORT);

      } else {
        ToastAndroid.show('Failed! Something went wrong...', ToastAndroid.SHORT);

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

      ToastAndroid.show('Otp Verification Successful!', ToastAndroid.SHORT);

      setTimeout(() => {
        router.push('/(tabs)');
      }, 2000);
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.') {
        ToastAndroid.show('User already exists...', ToastAndroid.SHORT);

      } else {
        ToastAndroid.show('Failed! Check the number or connection and try again...', ToastAndroid.SHORT);

      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSupport = () => {
    router.push('/(other)/support');
  };

  return (
    <>
      {isLoading && <Loading />}
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme ? '#0F0F0F' : 'white' }]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
              <PageHeader />
              <Toast />
              <View style={styles.content}>
                <ThemedText style={styles.title}>Enter the 6-digit code we texted to {formatPhoneNumber()}</ThemedText>
                <ThemedText style={styles.text}>This extra step shows it's really you trying to sign in</ThemedText>

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
                      style={[styles.input, errors.code && styles.inputError, { color: theme ? 'white' : 'black' }]}
                      placeholder='******'
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType='numeric'
                    />
                  )}
                  name="code"
                />
                {errors.code && <ThemedText style={styles.errorText}>{errors.code.message}</ThemedText>}
              </View>

              <View style={styles.footer}>
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.buttonSubmit}>
                  <ThemedText style={styles.buttonText}>Submit</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendPhoneConfirmationOtpToValidate} style={styles.buttonSubmit}>
                  <ThemedText style={styles.buttonText}>Resend Code</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonHelp} onPress={navigateToSupport}>
                  <ThemedText style={styles.buttonText}>I need help</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Add padding to ensure content is visible above keyboard
  },
  content: {
    marginTop: 20,
    flex: 1,
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
    borderColor: 'gray',
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
    marginTop: 20,
  },
  buttonSubmit: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'yellow', // equivalent to bg-yellow-300
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
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
