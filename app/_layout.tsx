import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import "@/global.css"
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import config from '../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
    
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    MonsterMid: require('../assets/fonts/montserrat/Montserrat-Medium.ttf'),
    MonsterReg: require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
    MonsterBold: require('../assets/fonts/montserrat/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;




  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
    <TamaguiProvider config={config}>
      <Stack initialRouteName='(tabs)'>

    <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        <Stack.Screen name='index' options={{headerShown:false}}/>
      <Stack.Screen name="(onboarding)" options={{headerShown:false}}/>
      <Stack.Screen name="(other)" options={{headerShown:false}}/>
      <Stack.Screen name="(trade)" options={{headerShown:false}}/>
      <Stack.Screen name="(market)" options={{headerShown:false}}/>
       <Stack.Screen name="+not-found" />
      </Stack>   
    </TamaguiProvider>
    </ThemeProvider> 
    </GestureHandlerRootView>
  );
}




// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEfect } from 'react';
// import 'react-native-reanimated';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import "@/global.css"


// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
//       <Stack initialRouteName='(onboarding)'>
//         <Stack.Screen name='index' options={{headerShown:false}}/>
//       <Stack.Screen name="(onboarding)" options={{headerShown:false}}/>
//       <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
//         <Stack.Screen name="+not-found" />
//       </Stack>
//     </ThemeProvider>
//   );
// }
