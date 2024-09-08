import { useAppSelector } from '@/hooks/useAppSelector';
import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

const TradingHeader = ({data, style}) => {
  const pathname = usePathname()
  const theme = useAppSelector(state => state.theme.theme)

  const router = useRouter()

  const navigateToSelectedTab = (screen) => {
    console.log(screen)
    if(pathname !== `/${screen}`){
   router.navigate(`(trade)/${screen}`)
    }
    else{
      return null
    }
  }

  return (
    <View style={[styles.container, style, {backgroundColor:theme ? 'rgba(255,255,255,.1)': 'white'}]}>
      {data?.map(period => (
        <TouchableOpacity
          key={period.id}
          style={[
            styles.button,
            pathname === `/${period.screen}` && styles.selectedButton
          ]}
          onPress={() => navigateToSelectedTab(period.screen)}
        >
          <ThemedText
            style={[
              styles.buttonText,
              pathname === `/${period.scren}` && styles.selectedButtonText
            ]}
          >
            {period.name}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 13,
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
    fontFamily:'MonsterBold'
  },
  selectedButtonText: {
    color: '#4A4A4A',
    fontFamily:'MonsterBold'
  },
});

export default TradingHeader;
