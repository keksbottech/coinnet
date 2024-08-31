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
import { getUserInfo } from '@/lib/store/reducers/storeUserInfo';

const AuthenticationCode = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const [otpId, setOtpId] = useState(null);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      code: '',
    },
  });

  const sendPhoneConfirmationOtpToValidate = async () => {
    try {
      setIsLoading(true);

      const body = {
        userId: userData?.userAuthId,
        phone: userData?.phone,
      };

      await axios.patch('user/update', { userId: userData?._id, updateData: {
        phone: userData?.phone,
        isNotUpdating: true
      }});

      const sendOtp = await axios.post('user/otp/phone/send', body);

      const updateData = {
        phone: userData.phone,
        otpId: sendOtp.data.message.userId,
      };

      const updates = await axios.patch('user/update', { userId: userData?._id, updateData });

      dispatch(getUserInfo(updates.data.message));

      Toast.show({
        type: 'success',
        text1: 'Otp Sent Successfully',
        text2: 'Check your phone for the otp code sent to you',
      });

    } catch (err: any) {
      console.log(err);
      handleOtpError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpError = (err:any) => {
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
  };

  const navigateToKycVerification = async (data: { code: string }) => {
    try {
      const { code } = data;
      setIsLoading(true);

      const body = {
        userId: userData?.otpId,
        otp: code,
      };

      const response = await axios.post('user/otp/verify', body);

      dispatch(getUserSession(response.data.message));

      const updateData = {
        isPhoneVerified: true,
        userId: userData?._id,
      };

      const updateIsVerified = await axios.patch('user/update', updateData);

      dispatch(getUserInfo(updateIsVerified.data.message));

      Toast.show({
        type: 'success',
        text1: 'Otp Verification Successful',
        text2: 'Redirecting...',
      });

      setTimeout(() => {
        router.push('/(onboarding)/kycverification');
      }, 2000);

    } catch (err: any) {
      console.log(err);
      handleOtpError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resendUserPhoneOtp = async () => {
    try {
      const body = {
        userId: userData?.userAuthId,
        phone: userData?.phone,
      };

      const sendOtp = await axios.post('user/otp/phone/send', body);

      Toast.show({
        type: 'success',
        text1: 'Otp Sent Successfully',
        text2: 'Check your phone for the otp code sent to you',
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Invalid Code',
        text2: 'The code you provided is invalid',
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
          <PageHeader label={<ProgressBar currentStep={2} />} />
          <Toast />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Enter authentication code</Text>
            <Text style={styles.description}>
              Enter the 6-digit code we just texted to your phone number
            </Text>
            <View>
              <Text style={styles.label}>Code</Text>
              <Controller
                control={control}
                name="code"
                rules={{ required: 'Authentication code is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={styles.input}
                    placeholder="Authentication code"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              {errors.code && <Text style={styles.errorText}>{errors.code.message}</Text>}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              styles={styles.button}
              onClick={handleSubmit(navigateToKycVerification)}
              label="Continue"
            />
            <Button
              onClick={sendPhoneConfirmationOtpToValidate}
              styles={styles.resendButton}
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
  safeArea: {
    flex: 1,
    position: 'relative',
    padding: 10,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    marginTop: 40, // mt-10 in Tailwind
  },
  title: {
    fontFamily: 'MonsterBold',
    fontSize: 24, // text-3xl in Tailwind
  },
  description: {
    fontFamily: 'MonsterReg',
    color: '#6b7280', // text-gray-500 in Tailwind
    fontSize: 18, // text-xl in Tailwind
    marginVertical: 20,
    width: 300,
  },
  label: {
    fontFamily: 'MonsterBold',
    fontSize: 18, // text-xl in Tailwind
  },
  input: {
    marginTop: 10,
    fontFamily: 'MonsterReg',
  },
  errorText: {
    color: 'red',
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    bottom: 10,
  },
  button: {
    position: 'relative',
  },
  resendButton: {
    position: 'relative',
    borderWidth: 0.5,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    bottom: 10,
  },
});
