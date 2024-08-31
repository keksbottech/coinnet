import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import Toast from 'react-native-toast-message';
import Loading from '../loading/Loading';

const TransactionAuthenticationCode = () => {
  const router = useRouter();
  const authenticationInfo = useAppSelector(state => state.authenticationInfo.authenticationInfo);
  const exchangeData = useAppSelector(state => state.exchange.exchange);
  const userData = useAppSelector(state => state.user.user);
  const transactionData = useAppSelector(state => state.transaction.transactionName);
  const [isLoading, setIsLoading] = useState(false);
  const [otpId, setOtpId] = useState('');
  const [otpSuccess, setOtpSuccess] = useState(false);
  const withdrawalData = useAppSelector(state => state.withdrawal.withdrawal)
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      code: '',
    },
  });
  const withdrawMethod = useAppSelector(state => state.withdrawal.withdrawMethod)

  useEffect(() => {
    sendPhoneConfirmationOtpToValidate();
  }, []);

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
      setOtpSuccess(true);
    } catch (err:any) {
      if (err.response?.data?.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.') {
        Toast.show({
          type: 'error',
          text1: 'Otp failed to send',
          text2: 'User already exists. Try another phone number to create an account',
        });
      } else if (err.response?.data?.message === 'Phone number already in use by another user') {
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

  const onSubmit = async (data:any) => {
    try {
      setIsLoading(true);
      const body = {
        userId: userData?._id,
        convertFrom: exchangeData.selectFrom,
        convertTo: exchangeData.selectTo,
        toAmount: exchangeData.toAmount,
        fromAmount: exchangeData.fromAmount,
      };

      if (otpSuccess) {
        if (transactionData === 'exchange') {
          await axios.post('exchange', body);
          router.push('/(trade)/transactioncomplete');
        } else if (transactionData === 'withdrawal') {
          if(withdrawMethod === 'paystack' || withdrawMethod ==='Paystack'){
            await axios.post('withdraw/paystack', withdrawalData);
            router.push('/(trade)/transactioncomplete');
          }
          else if(withdrawMethod === 'flutterwave' || withdrawMethod ==='Flutterwave'){
            await axios.post('withdraw/flutterwave', withdrawalData);
            router.push('/(trade)/transactioncomplete');
          }
          else if(withdrawMethod === 'paypal' || withdrawMethod ==='Paypal'){
            const paypalBody = {
              userId: userData._id,
              amount: withdrawalData.amount, 
              currency: 'USD', 
              recipientEmail: withdrawalData.email
            }
            await axios.post('withdraw/paypal', paypalBody);
            router.push('/(trade)/transactioncomplete');
          }


        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading && <Loading />}
      <Toast />
      <View style={styles.container}>
        <Text style={styles.title}>Enter authentication code</Text>
        <Text style={styles.subtitle}>
          Enter the 7-digit code we just texted to your phone number to verify your transaction
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Code</Text>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.input}
                placeholder='Authentication code'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            styles={styles.button}
            onClick={handleSubmit(onSubmit)}
            label={isLoading ? 'Processing...' : 'Continue'}
            disabled={isLoading}
          />
          <Button
            styles={styles.resendButton}
            label='Resend code'
            onClick={sendPhoneConfirmationOtpToValidate}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionAuthenticationCode;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginVertical: 20,
    width: 300,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
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
    borderColor: 'black',
    borderWidth: 0.5,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    bottom: 10,
  },
});
