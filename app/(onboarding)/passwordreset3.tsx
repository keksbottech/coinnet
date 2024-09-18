import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import Input from '@/components/ui/input/Input';
import ToggleSwitch from '@/components/switch/Switch';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loading from '@/components/loading/Loading';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

const PasswordReset3 = () => {
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const theme = useAppSelector(state => state.theme.theme)
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
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


  const password = watch('password');

  const onSubmit = async (data:any) => {
    try{
      setIsLoading(true)
    if (isFingerprintEnabled) {
      await handleToggleSwitch(data.password)
    }

    const body = {
      userId:userData?.userAuthId,
      password: data.password
    }

    const response = await axios.patch('user/update/password', body)

    console.log(response)

    ToastAndroid.show('Password updated successfully!', ToastAndroid.LONG);

    setTimeout(() => {
         router.push('/(onboarding)/passwordreset4'); 
    }, 2000);
  
  }
  catch(err){
    console.log(err)
    ToastAndroid.show('Failed! Unable to update password!', ToastAndroid.LONG);
  }
  finally{
    setIsLoading(false)
  }
  };

  const handleToggleSwitch = async (password:any) => {
 
    if (!isFingerprintEnabled) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware) {
        Alert.alert('Error', 'Your device does not support biometric authentication.');
        return;
      }

      if (!isEnrolled) {
        Alert.alert('Error', 'No biometrics are enrolled on this device.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to enable fingerprint',
      });

      if (result.success) {
        const res = await SecureStore.setItemAsync('userToken', password); // Store the token securely

        console.log(res)
        setIsFingerprintEnabled(true);
        Alert.alert('Success', 'Fingerprint authentication has been enabled.');
      } else {
        Alert.alert('Authentication failed', 'Fingerprint authentication could not be enabled.');
      }
    } else {
      setIsFingerprintEnabled(false);
      await SecureStore.deleteItemAsync('userToken'); // Optional: delete token if disabling fingerprint
    }
  };

  const authenticateWithBiometrics = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to log in',
    });

    if (result.success) {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        // Proceed with the login using the token
        console.log('Authenticated with token:', token);
        router.push('/(onboarding)/passwordreset4');
      } else {
        Alert.alert('No token found. Redirect to password login.');
      }
    } else {
      Alert.alert('Biometric authentication failed.');
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={[styles.container,  {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PageHeader
            icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white':"black"} />}
            label={<NumberStepProgress currentStep={3} />}
          />

<Toast/>
          <View style={styles.content}>
            <View style={styles.headerContent}>
              <ThemedText style={styles.headerTitle}>Create a password</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                The password must be 8 characters, including 1 uppercase letter, 1
                number, and 1 special character.
              </ThemedText>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Password</ThemedText>
                <Controller
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                      message: 'Password must include an uppercase letter, a number, and a special character',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="password"
                />
                {errors.password && <ThemedText style={styles.errorText}>{errors.password.message}</ThemedText>}
              </View>

              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Confirm Password</ThemedText>
                <Controller
                  control={control}
                  rules={{
                    required: 'Confirm Password is required',
                    validate: (value) => value === password || 'Passwords do not match',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.input}
                      placeholder="Confirm Password"
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="confirmPassword"
                />
                {errors.confirmPassword && (
                  <ThemedText style={styles.errorText}>{errors.confirmPassword.message}</ThemedText>
                )}
              </View>

              <View style={styles.toggleContainer}>
                <ThemedText style={styles.label}>Unlock with Touch ID?</ThemedText>
                <ToggleSwitch
                  isToggled={isFingerprintEnabled}
                  onValueChange={() => handleToggleSwitch(password)}
                />
              </View>
            </View>

            <Button onClick={handleSubmit(onSubmit)} styles={styles.button} label="Continue" />
            <ThemedText style={styles.termsText}>
              By registering you accept our Terms & Conditions and Privacy Policy.
              Your data will be securely encrypted with TLS.
            </ThemedText>
          </View>

          {/* <View style={styles.oauthContainer}>
            <ContinueWithOauth styles={{ position: 'relative' }} />
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};

export default PasswordReset3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  headerContent: {
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'MonsterBold',
  },
  headerSubtitle: {
    fontFamily: 'MonsterBold',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  formContainer: {
    marginTop: 40,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontFamily: 'MonsterBold',
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    marginTop: 8,
    fontFamily: 'MonsterReg',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'MonsterBold',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    position: 'relative',
    marginTop: 50,
    backgroundColor: 'lightgray',
  },
  termsText: {
    textAlign: 'center',
    fontFamily: 'MonsterBold',
    fontSize: 14,
    marginTop: 40,
  },
  oauthContainer: {
    paddingVertical: 50,
  },
});
