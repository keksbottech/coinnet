import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TradingHeader = ({data, style}) => {
  const pathname = usePathname()

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
    <View style={[styles.container, style]}>
      {data?.map(period => (
        <TouchableOpacity
          key={period.id}
          style={[
            styles.button,
            pathname === `/${period.screen}` && styles.selectedButton
          ]}
          onPress={() => navigateToSelectedTab(period.screen)}
        >
          <Text
            style={[
              styles.buttonText,
              pathname === `/${period.scren}` && styles.selectedButtonText
            ]}
          >
            {period.name}
          </Text>
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
    fontSize: 14,
    color: '#888',
    textAlign:'center'
  },
  selectedButtonText: {
    color: '#4A4A4A',
    fontWeight: 'bold',
  },
});

export default TradingHeader;
