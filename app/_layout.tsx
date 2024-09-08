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

SplashScreen.preventAutoHideAsync();

// export const unstable_settings = {
//   initialRouteName: '(tabs)',
// };

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

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(other)" options={{ headerShown: false }} />
      <Stack.Screen name="(trade)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
}
