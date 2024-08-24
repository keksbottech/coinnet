// src/screens/CheckUserSession.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';

const CheckUserSession = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userSession = useAppSelector(state => state.session.session)

  useEffect(() => {
    const checkSession = async () => {

      if (userSession) {
        router.push('(tabs)'); // Redirect to the home screen if session exists
      } else {
        router.push('(onboarding)/signin'); // Redirect to the login screen if no session exists
      }
    };

    checkSession();
    
  }, [dispatch, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CheckUserSession;
