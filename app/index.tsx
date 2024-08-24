import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { SessionHandler } from './_layout';

const Index = () => {
  //   const router = useRouter()
  //   const [isSessionChecked, setIsSessionChecked] = useState(false);
  //   const userSession = useAppSelector((state) => state.session.session);
 
  //     useEffect(() => {
  // console.log(userSession)
  //       const checkSession = () => {
  //         if (!userSession) {
  //           router.replace('/(onboarding)/signin')
  //         } else {
  //           router.replace('(tabs)'); 
  //         }
  //         setIsSessionChecked(true);
  //       };
    
  //       checkSession();
  //     }, [userSession, router, isSessionChecked]);  

    

  return (
    <View className='bg-yellow-300 h-full flex items-center justify-center'>
 <SessionHandler/>
    </View>
  );
};

export default Index;


const styles = StyleSheet.create({
    container:{
        backgroundColor:'yellow',
        flex:1,
        
    }
})