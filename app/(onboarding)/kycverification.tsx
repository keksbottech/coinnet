import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PageHeader from '@/components/page header/PageHeader';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '@/components/progress tab/ProgressTab';
import { useRouter } from 'expo-router';
import Fingerprint from '@/assets/svg/fingerprint.svg';
import Loading from '@/components/loading/Loading';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { ThemedText } from '@/components/ThemedText';

const KycVerification = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const userData = useAppSelector(state => state.user.user)
  const theme = useAppSelector(state => state.theme.theme)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bvn: '', // Initial value for BVN
      nin: '', // Initial value for NIN
    },
  });

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Store the selected image URI
      await uploadImage(result.assets[0].uri); // Upload image to Cloudinary
    }
  };

  const uploadImage = async (uri: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const fileType = uri.split('.').pop();

      formData.append('file', {
        uri,
        type: `image/${fileType}`,
        name: `upload.${fileType}`,
      } as any); // Correct way to handle file

      formData.append('upload_preset', 'coinnet');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dcgirmxbm/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        console.log(data.secure_url)
        setImageUri(data.secure_url); // Store the Cloudinary URL
        ToastAndroid.show('Image uploaded successfully!', ToastAndroid.LONG);

      } else {
        ToastAndroid.show('Failed to upload image', ToastAndroid.LONG);

        throw new Error('Failed to upload image. Try again');
      }
    } catch (error:any) {
      console.error(error);
      ToastAndroid.show('Failed to upload image. Try again', ToastAndroid.LONG);

    } finally {
      setIsLoading(false);
    }
  };

  const navigateToFacialRecognition = async (data: any) => {
    console.log(data);
    try {

      setIsLoading(true);
      const {bvn, nin} = data

      const body ={
        userId: userData?._id,
        bvnNumber: bvn,
        ninNumber: nin,
        ninPhoto: imageUri,
        isNinVerified: true,
        isBvnVerified: true,
        isUserVerified: true
      }

      console.log(body)
      if(!imageUri){
        ToastAndroid.show('You must upload your NIN slip', ToastAndroid.LONG);
      }
      const response = await axios.post('kyc/send', body)

      console.log(response.data)
      ToastAndroid.show('Data have been received. Pending verification', ToastAndroid.LONG);


      setTimeout(() => {
        router.push('/(onboarding)/bvnfacecaptureprompt');
      }, 2000);

    } catch (err) {
      console.log(err.response.data);
      ToastAndroid.show('Failed. Try again', ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <SafeAreaView style={[{ padding: 10, flex: 1 },  {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
              <PageHeader label={<ProgressBar currentStep={3} />} />
              <Toast />
              <View style={styles.container}>
                <View style={styles.header}>
                  <Fingerprint />
                  <ThemedText style={styles.title}>KYC Verification</ThemedText>
                </View>

                <ThemedText style={styles.description}>
                  Verify your identity! Upload a government-issued ID (Passport, driver’s license, national ID card) to complete KYC verification, secure your account, and unlock full platform features.
                </ThemedText>

                <View style={styles.inputGroup}>
                  <View>
                    <ThemedText style={[styles.text, { marginBottom: 10 }]}>Enter your BVN Number</ThemedText>
                    <Controller
                      control={control}
                      name="bvn"
                      rules={{
                        required: 'BVN Number is required',
                        minLength: { value: 11, message: 'BVN must be 11 digits' },
                        maxLength: { value: 11, message: 'BVN must be 11 digits' },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Input
                            style={styles.input}
                            placeholder="83**********"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="numeric"
                          />
                          {errors.bvn && <ThemedText style={{ color: 'red' }}>{errors.bvn.message}</ThemedText>}
                        </>
                      )}
                    />
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <ThemedText style={[styles.text, { marginBottom: 10 }]}>NIN Number</ThemedText>
                    <Controller
                      control={control}
                      name="nin"
                      rules={{
                        required: 'NIN Number is required',
                        minLength: { value: 11, message: 'NIN must be 11 digits' },
                        maxLength: { value: 11, message: 'NIN must be 11 digits' },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <>
                          <Input
                            style={styles.input}
                            placeholder="83**********"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="numeric"
                          />
                          {errors.nin && <ThemedText style={{ color: 'red' }}>{errors.nin.message}</ThemedText>}
                        </>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.uploadLinkContainer}>
                  <TouchableOpacity style={{ marginRight: 5 }} onPress={pickImage}>
                    <ThemedText style={styles.uploadLink}>Click Here</ThemedText>
                  </TouchableOpacity>
                  <ThemedText style={styles.text}>to upload NIN Slip</ThemedText>
                </View>

                {imageUri && (
                  <Image source={{uri:imageUri}} width={200} height={200}/>
                )}
              </View>
              <Button styles={{ position: 'relative' }} onClick={handleSubmit(navigateToFacialRecognition)} label="Continue" />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default KycVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    paddingVertical: 10,
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    marginVertical: 10,
    fontFamily: 'MonsterReg',
  },
  inputGroup: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
  },
  uploadLinkContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  uploadLink: {
    color: '#FFD700',
    fontFamily: 'MonsterBold',
  },
  text: {
    fontFamily: 'MonsterBold',
  },
  imageUrl: {
    marginTop: 10,
    color: '#2D9CDB',
    fontFamily: 'MonsterReg',
  },
});
