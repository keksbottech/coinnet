import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function Pay() {
  const paymentUrl = useAppSelector(state => state.paymentUrl.paymentUrl);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);
  const router = useRouter()
  const theme = useAppSelector(state => state.theme.theme)
  const webviewTransactionFallback = useAppSelector(state => state.transactionDetails.transactionWebviewFallback)

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (error: any) => {
    console.log('WebView error:', error);
    // Handle the error as needed
  };

  const handleNavigationStateChange = (navState: { url: string | string[]; }) => {
    if (navState.url.includes('payment-success')) {
      // Close the WebView or navigate away on success
      console.log('Payment successful:', navState.url);
    } else if (navState.url.includes('payment-cancel')) {
      // Handle payment cancellation
      console.log('Payment canceled:', navState.url);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Prevent back navigation
     if(webviewTransactionFallback ==='crypto'){
      router.push('/(tabs)/wallet')
     }
     else {
      router.push('/(fiattabs)')
     }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );


  return (
    <SafeAreaView style={[{ flex: 1 },  {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      {/* {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading payment...</Text>
        </View>
      )} */}
      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}
