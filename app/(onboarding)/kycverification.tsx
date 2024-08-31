import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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

const KycVerification = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const userData = useAppSelector(state => state.user.user)

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
        Toast.show({
          type: 'success',
          text1: 'Image uploaded successfully!',
        });
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error:any) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Image upload failed',
        text2: error.message,
      });
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

      if(!imageUri){
        Toast.show({
          type: 'error',
          text1: 'Nin Image Needed',
          text2: 'You must upload your nin slip',
        });
      }
      const response = await axios.post('kyc/send', body)

      console.log(response.data)

      Toast.show({
        type: 'success',
        text1: 'Verification successful',
        text2: 'Redirecting',
      });

      setTimeout(() => {
        router.push('/(onboarding)/alldone');
      }, 2000);
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Verification not successful',
        text2: 'Try again',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: 'white' }}>
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
                  <Text style={styles.title}>KYC Verification</Text>
                </View>

                <Text style={styles.description}>
                  Verify your identity! Upload a government-issued ID (Passport, driver’s license, national ID card) to complete KYC verification, secure your account, and unlock full platform features.
                </Text>

                <View style={styles.inputGroup}>
                  <View>
                    <Text style={[styles.text, { marginBottom: 10 }]}>Enter your BVN Number</Text>
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
                          {errors.bvn && <Text style={{ color: 'red' }}>{errors.bvn.message}</Text>}
                        </>
                      )}
                    />
                  </View>

                  <View style={{ marginTop: 10 }}>
                    <Text style={[styles.text, { marginBottom: 10 }]}>NIN Number</Text>
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
                          {errors.nin && <Text style={{ color: 'red' }}>{errors.nin.message}</Text>}
                        </>
                      )}
                    />
                  </View>
                </View>

                <View style={styles.uploadLinkContainer}>
                  <TouchableOpacity style={{ marginRight: 5 }} onPress={pickImage}>
                    <Text style={styles.uploadLink}>Click Here</Text>
                  </TouchableOpacity>
                  <Text style={styles.text}>to upload NIN Slip</Text>
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
