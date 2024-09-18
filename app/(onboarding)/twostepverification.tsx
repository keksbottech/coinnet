import { StyleSheet, Text, View, TextInput, ToastAndroid, BackHandler } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import ProgressBar from '@/components/progress tab/ProgressTab';
import CountryPicker from 'react-native-country-picker-modal';
import { useAppSelector } from '@/hooks/useAppSelector';
import Toast from 'react-native-toast-message';
import Loading from '@/components/loading/Loading';
import { axios } from '@/lib/axios';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserInfo } from '@/lib/store/reducers/storeUserInfo';
import { ThemedText } from '@/components/ThemedText';
import { useFocusEffect } from '@react-navigation/native';

const TwoStepVerification = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<any>('NG');
  const [country, setCountry] = useState<any>(null);
  const userData = useAppSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phone: '',
    },
  });

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


  const navigateToAuthenticationCode = () => {
    // Navigation logic
  };

  const sendPhoneConfirmationOtpToValidate = async (data: { phone: string }) => {
    try {
      setIsLoading(true);

      const code = country?.callingCode[0] || '234';
      const body = {
        userId: userData?.userAuthId,
        phone: `+${code}${data.phone}`,
      };

      await axios.patch('user/update', { userId: userData?._id, updateData: {
        phone: `+${code}${data.phone}`,
        isNotUpdating: true
      }});

      const sendOtp = await axios.post('user/otp/phone/send', body);

      const updateData = {
        phone: `+${code}${data.phone}`,
        otpId: sendOtp.data.message.userId
      }

      const updates = await axios.patch('user/update', { userId: userData?._id, updateData })

      dispatch(getUserInfo(updates.data.message))

      ToastAndroid.show('OTP sent successfully!', ToastAndroid.SHORT);

      setTimeout(() => {
        router.push('/(onboarding)/authenticationcode');
      }, 2000);

    } catch (err: any) {
      if (err.response.data.message === 'AppwriteException: Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID.') {
        ToastAndroid.show('Failed! User with the phone exists', ToastAndroid.LONG);
      } else if (err.response.data.message === 'Phone number already in use by another user') {
        ToastAndroid.show('Failed! User with the phone exists', ToastAndroid.LONG);
      } else {
        ToastAndroid.show('Failed! Check the phone number or internet connection', ToastAndroid.LONG);
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
          <PageHeader label={<ProgressBar currentStep={2} />} />
          <Toast />
          <View style={styles.headerContainer}>
            <ThemedText style={styles.title}>Set up 2-step verification</ThemedText>
            <ThemedText style={styles.description}>
              Enter your phone number so we can text you an authentication code.
            </ThemedText>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputLabels}>
              <ThemedText style={styles.label}>Country</ThemedText>
              <ThemedText style={styles.label}>Phone</ThemedText>
            </View>

            <View style={styles.inputWrapper}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton={false}
                withCallingCode
                withEmoji
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCountry(country);
                }}
                containerButtonStyle={styles.countryPicker}
              />
              <ThemedText style={styles.callingCode}>+{country ? country?.callingCode : '234'}</ThemedText>
              <Controller
                control={control}
                name="phone"
                rules={{ required: 'Phone number is required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    style={styles.input}
                    placeholder="Your phone number"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.phone && <ThemedText style={styles.errorText}>{errors.phone.message}</ThemedText>}
          </View>

          <Button label="Continue" onClick={handleSubmit(sendPhoneConfirmationOtpToValidate)} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default TwoStepVerification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'MonsterBold',
  },
  description: {
    fontSize: 16,
    color: '#6B6B6B',
    fontFamily: 'MonsterReg',
    marginTop: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  inputLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.4,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  countryPicker: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  callingCode: {
    paddingHorizontal: 10,
    fontFamily: 'MonsterReg',
  },
  input: {
    borderColor: 'transparent',
    width: '100%',
    fontFamily: 'MonsterReg',
    borderWidth:0
  },
  errorText: {
    color: 'red',
  },
});
