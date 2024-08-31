import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const OnboardingScreen = () => {
  const router = useRouter();

  const navigateToSignin = () => {
    router.push('/(onboarding)/signin');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/logo/logo.png')}
          style={styles.logo}
        />

        <TouchableOpacity style={styles.button} onPress={navigateToSignin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9C74F', // equivalent to bg-yellow-300
  },
  logo: {
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: 'white',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'absolute',
    bottom: 100,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20, // equivalent to text-xl
  },
});
