import {  useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TradingHeaderPeriod = ({data, style}) => {
    const [periodSelected, setPeriodSelected] = useState('1Hour')

  const router = useRouter()

  const navigateToSelectedTab = (name) => {
    setPeriodSelected(name)
  }

  return (
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

export default TradingHeaderPeriod;
