import { useAppSelector } from '@/hooks/useAppSelector';
import { useFocusEffect } from '@react-navigation/native';
import {  usePathname, useRouter, useSegments } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TradingHeaderPeriod = ({data, style}) => {
    const [periodSelected, setPeriodSelected] = useState('crypto')
  const router = useRouter()
  const pathname = usePathname()
  const segments = useSegments(); // Gets the current path segments
  const theme = useAppSelector(state => state.theme.theme)


  
  console.log(segments)

  useFocusEffect(
    useCallback(() => {
      if(segments[0] === '(tabs)'){
        setPeriodSelected('crypto')
      }
      else if(segments[0] === '(fiattabs)'){
        setPeriodSelected('fiat')
      }
    }, [pathname])
  )

  const navigateToSelectedTab = (name) => {
    setPeriodSelected(name)
  
    if(name === 'crypto'){
      router.push('/(other)/switchtabsforcrypto')
    }
    else{
      router.push(`/(other)/switchtabsforfiat`)
    }
  }

  return (
    <View style={{alignItems:'center'}}>
    <View style={[styles.container, style]}>
      {data?.map(period => (
        <TouchableOpacity
          key={period.id}
          style={[
            styles.button,
            periodSelected === `${period.name}` && styles.selectedButton
          ]}
          onPress={() => navigateToSelectedTab(period.name)}
        >
          <Text
            style={[
              styles.buttonText,
              periodSelected === `${period.name}` && styles.selectedButtonText
            ]}
          >
            {period.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 7,
    width:'50%',

  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    width:100
  },
  buttonText: {
    fontSize: 13,
    color: '#888',
    textAlign:'center',
    fontFamily:'MonsterBold',
    textTransform:'capitalize'
  },
  selectedButtonText: {
    color: '#4A4A4A',
    fontFamily:'MonsterBold'
  },
});

export default TradingHeaderPeriod;
