import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import PageHeader from '@/components/page header/PageHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/input/Input';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/button/Button';
import ProgressBar from '@/components/progress tab/ProgressTab';
import CheckboxWithLabel from '@/components/ui/checkbox/Checkbox';
import { axios } from '@/lib/axios';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserInfo } from '@/lib/store/reducers/storeUserInfo';
import { getUserSession } from '@/lib/store/reducers/storeUserSession';
import Toast, { BaseToast, ToastOptions } from 'react-native-toast-message';
import Loading from '@/components/loading/Loading';
import { useAppSelector } from '@/hooks/useAppSelector';

// Define the shape of the form data
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
  // phone:''
}

const CreateAccount: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const userData = useAppSelector(state => state.user.user)

  // Initialize react-hook-form
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      termsAccepted: false,
      // phone:''
    }
  });

  const toastConfig = {
    success: (props: ToastOptions) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green', zIndex: 1000 }} // Adjust zIndex here
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 18, fontWeight: 'bold' }}
        text2Style={{ fontSize: 16 }}
      />
    ),
    // Add more configurations for other types if needed
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try{
     setIsLoading(true)
    const {firstName, lastName, email, password, termsAccepted} = data

    console.log(data)
    const body = {
      firstName,
      lastName,
      email,
      password,
      isAboveEighteen: termsAccepted,
      // phone: `+234${phone}`
    }

  
  const response = await axios.post('user/signup', body)

  console.log(response.data)

  Toast.show({
    type:'success',
    text1:'Signup Successful',
    text2:'User account was created successfully. Redirecting...'
  })


  dispatch(getUserInfo(response.data.message[0]))

  setTimeout(() => {
    router.push('(onboarding)/twostepverification')
  }, 2000);


    }
    catch(err){
      if(err.response.data.message === 'User email exists in our database'){
        Toast.show({
          type:'error',
          text1:'Signup Failed',
          text2:'User with the email exists in our application'
        })
      }
      else if(err.response.data.message === 'You have a missing parameter (firstname, lastname, password, email)'){
        Toast.show({
          type:'error',
          text1:'Signup Failed',
          text2:'You are missing an input'
        })
      }
      else if(err.response.data.message === 'AppwriteException: A user with the same id, email, or phone already exists in this project.'){
        Toast.show({
          type:'error',
          text1:'Signup Failed',
          text2:'User with the email exists in our application'
        })
      }
      else {
        Toast.show({
          type:'error',
          text1:'Signup Failed',
          text2:'Something went wrong... Try again'
        })
      }
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
    <Toast/>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <PageHeader label={<ProgressBar currentStep={1} />} />

          <View style={styles.container}>
            <View>
              <Text style={[styles.label, styles.title]}>Create your account</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Name</Text>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{ required: 'First name is required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.input}
                      placeholder="Mobbin"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.firstName && <Text style={{ color: 'red' }}>{errors.firstName.message}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Last Name</Text>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{ required: 'Last name is required' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.input}
                      placeholder="Mobbin"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.lastName && <Text style={{ color: 'red' }}>{errors.lastName.message}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
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
                      placeholder="mobbin.cms2@gmail.com"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
              </View>

              {/* <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone</Text>
                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: 'Phone is required',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.input}
                      placeholder="without country code or the the prefix 0"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.phone && <Text style={{ color: 'red' }}>{errors.phone.message}</Text>}
              </View> */}


              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      style={styles.input}
                      placeholder="XXXXXXXXXX"
                      secureTextEntry={true}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Controller
                  control={control}
                  name="termsAccepted"
                  rules={{ required: 'You must accept the terms and conditions' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CheckboxWithLabel
                      label={
                        <Text style={styles.text}>
                          I certify that I am 18 years of age or older, and I agree to the User Agreement and Privacy Policy.
                        </Text>
                      }
                      onValueChange={onChange}
                      value={value}
                    />
                  )}
                />
                {errors.termsAccepted && <Text style={{ color: 'red' }}>{errors.termsAccepted.message}</Text>}
              </View>

            </View>

            <Button onClick={handleSubmit(onSubmit)} styles={{position:'relative'}} label="Start" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    fontFamily: 'MonsterBold',
  },
  inputGroup: {
    marginTop: 20,
  },
  label: {
    fontFamily: 'MonsterBold',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    fontFamily: 'MonsterReg',
  },
  text: {
    fontFamily: 'MonsterReg',
  },
});
