import React, { useState } from 'react';
import { StyleSheet, Text, View, ToastAndroid, Image, ActivityIndicator, BackHandler, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/ui/button/Button';
import BvnFaceImage from '@/assets/svg/facecaputure.svg';
import { useFocusEffect } from '@react-navigation/native';

const BvnFaceCapture = () => {
  const router = useRouter();
  const theme = useAppSelector((state) => state.theme.theme);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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


  // Open Camera using Image Picker
  const openCamera = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      ToastAndroid.show('Permission to access camera is required!', ToastAndroid.LONG);
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Set the captured image URI
      await uploadImage(result.assets[0].uri);
    }
  };

  // Upload Image to Cloudinary
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

      const response = await fetch('https://api.cloudinary.com/v1_1/dcgirmxbm/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setImageUri(data.secure_url); // Store the Cloudinary URL
        ToastAndroid.show('Image uploaded successfully!', ToastAndroid.LONG); 

        navigateToBvnFaceCaptureBox()
    
      } else {
        throw new Error('Failed to upload image. Try again');
      }
    } catch (error: any) {
      console.error(error);
      ToastAndroid.show('Failed to upload image. Try again', ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToBvnFaceCaptureBox = () => {
    router.push('/(onboarding)/alldone');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme ? '#0F0F0F' : 'white' }]}>
      <View style={styles.container}>
        <BvnFaceImage />
        <ThemedText style={styles.title}>One More Thing</ThemedText>
        <ThemedText style={styles.description}>
          To complete your KYC verification, please ensure that your face is clearly visible and matches the photo on
          your NIN and BVN. Make sure you are in a well-lit environment with a plain background. Remove any facial
          accessories such as glasses or hats before taking the photo.
        </ThemedText>


        {/* Show selected image */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

 
          <Button
            onClick={openCamera}
            label='Open Camera'
          />

        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      </View>
    </SafeAreaView>
  );
};

export default BvnFaceCapture;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  container: {
    height: '100%',
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32, // equivalent to text-4xl
    marginTop: 10,
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18, // equivalent to text-xl
    color: '#6B7280', // equivalent to text-gray-500
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
