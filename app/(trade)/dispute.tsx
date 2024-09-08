import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loading from '@/components/loading/Loading';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';

type DisputeFormData = {
  title: string;
  message: string;
};

const DisputeScreen = () => {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<DisputeFormData>();
  const [isLoading, setIsLoading] = useState(false)
  const [imageUri, setImageUri] = useState('')
  const userData = useAppSelector(state => state.user.user)
  const router = useRouter()
  const theme = useAppSelector(state => state.theme.theme)

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setScreenshot(result.assets[0].uri);
      uploadImage(result.assets[0].uri)
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
        ToastAndroid.show('Image uploaded successfully!', ToastAndroid.SHORT);

      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error:any) {
      console.error(error);
      ToastAndroid.show('Failed to upload image!', ToastAndroid.SHORT);

    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async(data: DisputeFormData) => {
try{
 // Submit dispute logic
 setIsLoading(true)
 const {title, message} = data

 const body = {
   userId: userData._id,
   chatId: '',
   screenshot: imageUri,
   title,
   message
 }

 const response = await axios.post('dispute', body)

 console.log(response.data)
 
 ToastAndroid.show('Dispute submitted successfully!', ToastAndroid.SHORT);

 setTimeout(() => {
  router.back()
 }, 2000);
}
catch(err){
  console.log(err)
  ToastAndroid.show('Failed to send dispute!', ToastAndroid.SHORT);

}
finally{
  setIsLoading(false)
}
  };

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <Toast/>
      <View style={{ flex: 1 }}>
        <ThemedText style={styles.header}>Submit a Dispute</ThemedText>

        <Controller
          control={control}
          rules={{
            required: 'Title is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            placeholderTextColor={'#ccc'}
              style={[styles.input, errors.title && { borderColor: 'red' }]}
              placeholder="Dispute Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

        <Controller
          control={control}
          rules={{
            required: 'Message is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
            placeholderTextColor={'#ccc'}
              style={[styles.input, { height: 100 }, errors.message && { borderColor: 'red' }]}
              placeholder="Dispute Message"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
          name="message"
        />
        {errors.message && <Text style={styles.errorText}>{errors.message.message}</Text>}

        <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Choose Screenshot</Text>
        </TouchableOpacity>
        {screenshot && (
          <Image source={{ uri: screenshot }} style={styles.screenshot} />
        )}

        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Dispute</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  screenshot: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default DisputeScreen;
