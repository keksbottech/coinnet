import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import Toast from 'react-native-toast-message';
import Loading from '../loading/Loading';
import { ThemedText } from '../ThemedText';

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
  const theme = useAppSelector(state => state.theme.theme)
  
  useEffect(() => {
    sendPhoneConfirmationOtpToValidate();
  }, []);

   console.log(withdrawMethod)
  const sendPhoneConfirmationOtpToValidate = async () => {
    try {
      setIsLoading(true);
      const body = {
        userId: userData?.userAuthId,
        phone: userData?.phone,
      };

      console.log(body)

      const sendOtp = await axios.post('user/otp/phone/send', body);
      setOtpId(sendOtp.data.message.userId);

      ToastAndroid.show('Otp sent successfully!', ToastAndroid.SHORT);

      setOtpSuccess(true);
    } catch (err:any) {
      if (err.response?.data?.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.') {
        ToastAndroid.show('Failed! Contact customer service', ToastAndroid.SHORT);
      } else if (err.response?.data?.message === 'Phone number already in use by another user') {
        ToastAndroid.show('Failed! Something went wrong', ToastAndroid.SHORT);

      } else {
        ToastAndroid.show('Failed! Something went wrong. Contact customer support', ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data:any) => {
    try {
      setIsLoading(true);

      const body = {
        userId: otpId,
        otp: data.code,
      };

      const response = await axios.post('user/otp/verify', body);

      
      ToastAndroid.show('Otp verified successfully!', ToastAndroid.SHORT);

      if (true) {

        console.log(transactionData)

        if (transactionData === 'exchange') {
          const body = {
            userId: userData?._id,
            convertFrom: exchangeData.selectFrom,
            convertTo: exchangeData.selectTo,
            toAmount: exchangeData.toAmount,
            fromAmount: exchangeData.fromAmount,
          };

          await axios.post('exchange', body);
          ToastAndroid.show('Exchange Successful!', ToastAndroid.SHORT);

          router.push('/(trade)/transactioncomplete');
        } else if (transactionData === 'withdrawal') {

          if(withdrawMethod.name === 'Bank Transfer'){
            await axios.post('withdraw/paystack', withdrawalData);
            ToastAndroid.show('Withdrawal successful!', ToastAndroid.SHORT);

            router.push('/(trade)/transactioncomplete');
          }
          // else if(withdrawMethod === 'flutterwave' || withdrawMethod ==='Flutterwave'){
          //   await axios.post('withdraw/flutterwave', withdrawalData);
          //   ToastAndroid.show('Withdrawal successful!', ToastAndroid.SHORT);

          //   router.push('/(trade)/transactioncomplete');
          // }
          else if(withdrawMethod.name === 'payPal' || withdrawMethod.name ==='PayPal'){
            const paypalBody = {
              userId: userData._id,
              amount: withdrawalData.amount, 
              currency: 'USD', 
              recipientEmail: withdrawalData.email,
              coin: withdrawalData.coin,
              coinAmount: withdrawalData.coinAmount
            }

            console.log(paypalBody, 'from paypal')
            await axios.post('withdraw/paypal', paypalBody);
            ToastAndroid.show('Withdrawal successful!', ToastAndroid.SHORT);

            router.push('/(trade)/transactioncomplete');
          }


        }
      }
    } catch (err:any) {
      if(err?.response.data.message === 'Insufficient balance'){
        ToastAndroid.show('Failed! Insufficient funds. Redirecting to fund...', ToastAndroid.SHORT);

        setTimeout(() => {
          router.push('/(tabs)')
        }, 2000);
      }
      else if(err?.response.data.message === 'AppwriteException: Invalid token passed in the request.'){
        ToastAndroid.show('Failed! Invalid Token...', ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show('Failed! Something went wrong. Try again or resend otp', ToastAndroid.SHORT);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
          {isLoading && <Loading />}

    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Enter authentication code</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter the 6-digit code we just texted to your phone number to verify your transaction
        </ThemedText>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputLabel}>Code</ThemedText>
          <Controller
            control={control}
            name="code"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={[styles.input, {color:theme ? 'white': 'black'}]}
                placeholder='Authentication code'
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                placeholderTextColor={'#eee'}
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
            textStyle={{color:'black'}}
            onClick={sendPhoneConfirmationOtpToValidate}
          />
        </View>
      </View>
    </SafeAreaView>
    </>
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
    bottom:30
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
