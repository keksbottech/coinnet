import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function Pay() {
  const paymentUrl = useAppSelector(state => state.paymentUrl.paymentUrl);
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef(null);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading payment...</Text>
        </View>
      )}
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
