import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const Index = () => {
    const router = useRouter()

    useEffect(() =>{
        setTimeout(() =>{
            router.push('/(onboarding)')
        }, 2000)
    },[])



  return (
    <View className='bg-yellow-300 h-full flex items-center justify-center'>
      <Image 
        source={require('@/assets/images/logo/logo.png')} 
        style={{ width: 150, height: 150 }} // Provide width and height for the image
      />
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