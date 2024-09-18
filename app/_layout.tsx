import 'expo-dev-client';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TamaguiProvider } from 'tamagui';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import config from '../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from '@/lib/store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { Users } from '@tamagui/lucide-icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getUserInfo } from '@/lib/store/reducers/storeUserInfo';
import { getThemeData } from '@/lib/store/reducers/storeTheme';
import io from 'socket.io-client'
// import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

// import * as SecureStore from 'expo-secure-store'

// const tokenCache = {
//   async getToken(key: string) {
//     try {
//       const item = await SecureStore.getItemAsync(key)
//       if (item) {
//         console.log(`${key} was used 🔐 \n`)
//       } else {
//         console.log('No values stored under key: ' + key)
//       }
//       return item
//     } catch (error) {
//       console.error('SecureStore get item error: ', error)
//       await SecureStore.deleteItemAsync(key)
//       return null
//     }
//   },
//   async saveToken(key: string, value: string) {
//     try {
//       return SecureStore.setItemAsync(key, value)
//     } catch (err) {
//       return
//     }
//   },
// }

let socket;


SplashScreen.preventAutoHideAsync();

// export interface TokenCache {
//   getToken: (key: string) => Promise<string | undefined | null>
//   saveToken: (key: string, token: string) => Promise<void>
//   clearToken?: (key: string) => void
// }
// export const unstable_settings = {
//   initialRouteName: '(tabs)',
// };
// const publishableKey = 'pk_test_YWxsb3dlZC10YWhyLTc1LmNsZXJrLmFjY291bnRzLmRldiQ'


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [layoutReady, setLayoutReady] = useState(false);
  const [loaded] = useFonts({
    MonsterMid: require('../assets/fonts/montserrat/Montserrat-Medium.ttf'),
    MonsterReg: require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
    MonsterBold: require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
  });
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'light'); // Manage theme state


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setLayoutReady(true);
    }
  }, [loaded]);

  if (!loaded || !layoutReady) return null; // Ensure fonts are loaded and layout is ready before rendering

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
          <TamaguiProvider config={config}>
            <SessionHandler isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} layoutReady={layoutReady}/>
          </TamaguiProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
export function SessionHandler({layoutReady, isDarkMode, setIsDarkMode}:any) {
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  const router = useRouter();
  const userSession = useAppSelector((state) => state.session.session);
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)
  const userData = useAppSelector(state => state.user.user)


  if (layoutReady) {

    useEffect(() => {
      dispatch(getThemeData(theme))
    setIsDarkMode(theme)
    


// console.log(userSession)
      const checkSession = async () => {
        try{
      // const session = await axios.get('user/session')
      // console.log('sessoppm',session.data)

        if (!userSession) {
          router.replace('/(onboarding)/signin')
        } else {
          router.replace('/(tabs)'); 
        }
        setIsSessionChecked(true);
        }
        catch(err){
          console.log(err)
          router.replace('/(onboarding)/signin')
        }
      };
  
      checkSession();
    }, [userSession, isSessionChecked]);  


    useEffect(() => {
      // Initialize the socket connection if user data or session exists
      if (userData?._id) {
        socket = io('https://80b9-105-113-12-52.ngrok-free.app', {
          query: {
            userId: userData._id
          }
        });
  
        const userOnlineData = {
          userId: userData._id
        };
  
        // Emit user online when connected
        socket.emit('userOnline', userOnlineData);
  
        // Handle socket disconnection
        socket.on('disconnect', () => {
          socket.emit('userOffline', { userId: userData._id }); // Inform server about the disconnection
        });

        const heartbeatInterval = setInterval(() => {
          socket.emit('heartbeat', { userId: userData._id });
        }, 10000); // 10 seconds, for example
        
  
        // Cleanup function to properly handle disconnection
        return () => {
          clearInterval(heartbeatInterval);
          socket.disconnect(); // Properly disconnect the socket when component unmounts
        };
      }
    }, [userData, userSession, router]);


  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(other)" options={{ headerShown: false }} />
      <Stack.Screen name="(trade)" options={{ headerShown: false }} />
     <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
     <Stack.Screen name="(fiattabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
}
