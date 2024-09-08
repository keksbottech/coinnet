import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { useAppSelector } from '@/hooks/useAppSelector';
import Toast from 'react-native-toast-message';
import Loading from '../loading/Loading';
import { axios } from '@/lib/axios';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserSession } from '@/lib/store/reducers/storeUserSession';
import { ThemedText } from '../ThemedText';

const ProfileScreen = () => {
  const [imageUri, setImageUri] = useState<any>(null);
  const [selectedGender, setSelectedGender] = useState("male");
  const userData = useAppSelector(state => state.user.user)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)


  const selectImage = async () => {
    // Request permission to access media library
    try{
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }


    // Launch the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await uploadImage(result.assets[0].uri); // Upload image to Cloudinary
    }
  }
  catch(err){
    ToastAndroid.show('Failed to access image! Try again', ToastAndroid.SHORT);
    console.log(err)
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
        ToastAndroid.show('Image uploaded successfully', ToastAndroid.SHORT);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error:any) {
      console.error(error);
      ToastAndroid.show('Failed to upload image! Try again', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };


  const logoutUser = async () => {
    try{
      setIsLoading(true)

      const body = {
        userId: userData?.userAuthId
      }

      const response = await axios.post('user/logout', body)

      ToastAndroid.show('Logged out successfully!', ToastAndroid.SHORT);

      dispatch(getUserSession(null))


      // Toast.show({
      //   type:'success',
      //   text1:'Logged out successfully'
      // })

      setTimeout(() => {
        router.push('/(onboarding)/signin')
      }, 2000);
    }
    catch(err){
      ToastAndroid.show('Failed to logout! Try again', ToastAndroid.SHORT);
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  }
  

  return (
    <>
    {isLoading && <Loading/>}
    <Toast/>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {userData?.profileImage ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Image source={require('@/assets/images/dummy.png')} style={styles.image} />
        )}
        <TouchableOpacity onPress={selectImage} style={styles.editBtn}>
          <Feather name="camera" size={14} color="black" />
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.label}>{`${userData?.firstName} ${userData?.lastName}`}</ThemedText>
      <TextInput placeholderTextColor={theme ? 'white':'black'} readOnly style={styles.input} placeholder={`${userData?.firstName} ${userData?.lastName}`} />
      <View style={styles.inputContainer}>
        <ThemedText style={styles.flag}>🇳🇬 +234</ThemedText>
        <TextInput
        readOnly
          style={styles.phoneInput}
          placeholder={`${userData?.phone}`} 
          keyboardType="numeric"
          placeholderTextColor={theme ? 'white': 'black'}
        />
      </View>
      <Picker
        selectedValue={selectedGender}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
      </Picker>
      <TextInput readOnly placeholderTextColor={theme ? 'white': 'black'} style={styles.input} placeholder={`${userData?.email}`}  />
      <TouchableOpacity onPress={logoutUser} style={styles.logoutButton}>
        <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: 20,
    flexDirection: 'row',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'MonsterBold',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'MonsterReg',
    paddingVertical: 16,
    color:'#ccc'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 15,
  },
  flag: {
    padding: 10,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontFamily: 'MonsterReg',
        color:'#ccc'
  },
  picker: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#eee',
    paddingVertical: 15,
  },
  logoutButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9C74F',
    borderRadius: 5,
    top:100
  },
  logoutButtonText: {
    color: 'white',
    fontFamily: 'MonsterBold',
  
  },
  editBtn: {
    position: 'absolute',
    right: -5,
    borderRadius: 50,
    backgroundColor: '#eee',
    padding: 10,
    bottom: 0,
  },
});

export default ProfileScreen;
