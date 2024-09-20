import { StyleSheet, Text, View, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import GoogleImage from '@/assets/svg/google.svg'; // Replace with your actual Google image component
import AppleImage from '@/assets/svg/apple.svg';   // Replace with your actual Apple image component
import FacebookImage from '@/assets/svg/facebook.svg'; // Replace with your actual Facebook image component
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loading from '../loading/Loading';
import { getUserInfo } from '@/lib/store/reducers/storeUserInfo';
import { axios } from '@/lib/axios';
import { ThemedText } from '../ThemedText';

const ContinueWithOauth = ({ url }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const paymentUrl = useAppSelector(state => state.paymentUrl.paymentUrl);
  const [userInfo, setUserInfo] = useState(null);


  const androidClientId = '260896974979-pp9d0kgsa3e5sq9ilidd86cfghcjdqt7.apps.googleusercontent.com';
  const iosClientId = '260896974979-drjr3qqlgbchbdr3i8gug891m6u0bhhn.apps.googleusercontent.com';
  const webClientId = '260896974979-nrcqnnvo40k2hklpnd3i1c7epmge30ig.apps.googleusercontent.com';

  // Google OAuth request
  const [googleRequest, googleResponse, promptGoogleAsync] = Google.useAuthRequest({
    androidClientId,
    iosClientId,
    webClientId,
    scopes: ['profile', 'email'],
    redirectUri:
      Platform.OS === 'android'
        ? AuthSession.makeRedirectUri({
            scheme: 'com.lexisdevelopment.coinnet',
            path: url
          })
        : undefined,
  });

  useEffect(() => {
    handleResponseUpdate();
  }, [googleResponse]);

  const handleResponseUpdate = async () => {
    if (googleResponse?.type === "success") {
      const token = googleResponse?.authentication.accessToken;

      if (!token) {
        return;
      }

      try {
        setIsLoading(true)
        const me = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const googleUser = await me.json();

        console.log(googleUser)

  
        const body = {
          firstName: googleUser.family_name,
          lastName:googleUser.given_name,
          email:googleUser.email,
          profileImage:googleUser.picture
        }
    
      
      const response = await axios.post('user/oauth/google', body)
    
      console.log(response.data)
      dispatch(getUserInfo(response.data.message))

      ToastAndroid.show('Signed up successfully! Redirecting...', ToastAndroid.LONG);
    
      console.log(response.data.message.isNewUser)

      if(response.data.message.isNewUser){
      setTimeout(() => {
        router.push('/(onboarding)/twostepverification');
      }, 2000);

      }
      else{
      setTimeout(() => {
        router.push('/(onboarding)/verification')
      }, 2000);

      }

    
    
    
   
    

      } catch (error) {
        // error
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
    }
  };
  const googleSignin = async () => {
    setIsLoading(true);
    try {
      await promptGoogleAsync();


      
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const facebookSignin = async () => {
  //   setIsLoading(true);
  //   try {
  //     await promptFacebookAsync();
  //   } catch (error) {
  //     console.error('Facebook Sign-In Error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      {isLoading && <Loading />}
      <View style={[localStyles.container]}>
        <View style={localStyles.separatorContainer}>
          <View style={localStyles.separator} />
          <ThemedText style={localStyles.text}>or continue with</ThemedText>
          <View style={localStyles.separator} />
        </View>

        <View style={localStyles.iconContainer}>
          {/* <TouchableOpacity onPress={facebookSignin} style={localStyles.iconButton}>
            <FacebookImage />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={googleSignin} style={localStyles.iconButton}>
            <GoogleImage />
          </TouchableOpacity>

          {/* <TouchableOpacity style={localStyles.iconButton}>
            <AppleImage />
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    top:15
   
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  text: {
    marginHorizontal: 10,
    fontFamily:'MonsterBold',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 10,
  },
});

export default ContinueWithOauth;
