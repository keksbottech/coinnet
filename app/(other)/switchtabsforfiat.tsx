import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const QashScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current; // Initial opacity value
  const translateY = useRef(new Animated.Value(50)).current; // Initial translateY value

  const router = useRouter()

  useFocusEffect(

    useCallback(() => {
        const timeout = setTimeout(() => {
            router.push('/(fiattabs)')
        }, 3000);
  
        return () => {
            clearTimeout(timeout)
        }
    }, [])
  )

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000, // Fade-in duration
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0, // End position (no translation)
      duration: 1000, // Same duration as fade-in
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={['#1F1F1F', '#0D0D0D']}  // Gradient colors
      style={styles.container}
    >
   <FontAwesome name="dollar" size={44} color="white" />

      {/* Animated Texts */}
      <Animated.View style={[styles.textContainer, { opacity, transform: [{ translateY }] }]}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.mainText}>Fiat</Text>
        <Text style={styles.betaText}>Beta</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    width: width,
    height: height,
  },
  icon: {
    position: 'absolute',
    top: height * 0.2,  // Adjust icon position based on your screen height
    left: width * 0.05, // Adjust icon position based on your screen width
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 100,  // Move the text a little above the bottom
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily:'MonsterBold'
  },
  mainText: {
    color: '#C9FF0A', // Change to a more matching color
     fontSize: 40,
    fontFamily:'MonsterBold'
  },
  betaText: {
    color: '#A38716',
    fontSize: 14,
    backgroundColor: '#3A3A3A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginTop: 5,
  },
});

export default QashScreen;
