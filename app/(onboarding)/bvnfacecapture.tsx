import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '@/components/ui/button/Button';
import FaceCaptureBox from '@/assets/svg/facesquare.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const BvnFaceCapture = () => {
  const router = useRouter();

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


  const navigateToAllDone = () => {
    router.push('/(onboarding)/alldone');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FaceCaptureBox />
        <Button onClick={navigateToAllDone} label="Continue" />
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
