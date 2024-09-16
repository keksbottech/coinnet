import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useFocusEffect } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

const CryptoScreen = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  const router = useRouter()
  
  useFocusEffect(

    useCallback(() => {
        const timeout = setTimeout(() => {
            router.push('/(tabs)')
        }, 3000);
  
        return () => {
            clearTimeout(timeout)
        }
    }, [])
  )

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={['#1F1F1F', '#0D0D0D']}
      style={styles.container}
    >
<Fontisto name="bitcoin" size={44} color="white" />

      <Animated.View style={[styles.textContainer, { opacity, transform: [{ translateY }] }]}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.mainText}>Crypto</Text>
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
    top: height * 0.2,
    left: width * 0.05,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 100,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily:'MonsterBold'
  },
  mainText: {
    color: '#FF007F',
    fontSize: 46,
   fontFamily:'MonsterBold'
  },
});

export default CryptoScreen;
