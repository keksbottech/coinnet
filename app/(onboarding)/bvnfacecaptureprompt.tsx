import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '@/components/ui/button/Button';
import BvnFaceImage from '@/assets/svg/facecaputure.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const BvnFaceCapture = () => {
  const router = useRouter();

  const navigateToBvnFaceCaptureBox = () => {
    router.push('/(onboarding)/bvnfacecapture');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BvnFaceImage />
        <Text style={styles.title}>One More Thing</Text>
        <Text style={styles.description}>
          To complete your KYC verification, please ensure that your face is clearly visible and matches the photo on your NIN and BVN. Make sure you are in a well-lit environment with a plain background. Remove any facial accessories such as glasses or hats before taking the photo.
        </Text>
        <Button onClick={navigateToBvnFaceCaptureBox} label="Done" />
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
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32, // equivalent to text-4xl
    marginTop: 10,
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18, // equivalent to text-xl
    color: '#6B7280', // equivalent to text-gray-500
  },
});
