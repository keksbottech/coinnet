import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Separator } from 'tamagui';
import GoogleImage from '@/assets/svg/google.svg';
import AppleImage from '@/assets/svg/apple.svg';
import FacebookImage from '@/assets/svg/facebook.svg';
import { axios } from '@/lib/axios';
import Loading from '../loading/Loading';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

type ContinueWithOauthTypes = {
  styles?: {}
}


const ContinueWithOauth = ({ styles }: ContinueWithOauthTypes) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    configureSignin()
  }, [])

  const configureSignin = () => {
    GoogleSignin.configure({
      webClientId: '260896974979-nrcqnnvo40k2hklpnd3i1c7epmge30ig.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      androidClientId: '260896974979-pp9d0kgsa3e5sq9ilidd86cfghcjdqt7.apps.googleusercontent.com',
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: 'coinnet', // [Android] specifies an account name on the device that should be used
      iosClientId: '260896974979-drjr3qqlgbchbdr3i8gug891m6u0bhhn.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }

  const googleSignin = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        console.log(userInfo);
        
        // setState({ userInfo, error: undefined });
      } catch (error) {
        console.log(error)
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
              // user cancelled the login flow
              break;
            case statusCodes.IN_PROGRESS:
              // operation (eg. sign in) already in progress
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              // play services not available or outdated
              break;
            default:
            // some other error happened
          }
        } else {
          console.log(error)
          // an error that's not related to google sign in occurred
        }
      }
    finally{
      setIsLoading(false)
    }
  }

  const facebookSignin = async () => {
    try{
      setIsLoading(true)
      const response = await axios.post('user/facebook/oauth')

      console.log(response.data)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  }



  return (
    <>
    {isLoading && <Loading/>}
    <View style={[styles, localStyles.container]}>
      <View style={localStyles.separatorContainer}>
        <Separator />
        <Text style={localStyles.text}>or continue with</Text>
        <Separator />
      </View>

      <View style={localStyles.iconContainer}>
        <TouchableOpacity onPress={facebookSignin} style={localStyles.iconButton}>
          <FacebookImage />
        </TouchableOpacity>

<GoogleSigninButton
size={GoogleSigninButton.Size.Icon}
onPress={googleSignin}
/>
        <TouchableOpacity   style={localStyles.iconButton}>
          <AppleImage />
        </TouchableOpacity>

        <TouchableOpacity onPress={googleSignin} style={localStyles.iconButton}>
          <GoogleImage />
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

export default ContinueWithOauth;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 10,
  },
})
