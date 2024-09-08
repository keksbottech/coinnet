import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '../ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';

const TradingHistory = ({priceUsd, timestamp}) => {
const theme = useAppSelector(state => state.theme.theme)
  function formatTime() {
    const seconds = Math.floor(timestamp / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    const remainingSeconds = seconds % 60;
    const remainingMinutes   
   = minutes % 60;
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2,   
   '0')}`;
  
    return formattedTime;
  }
  
  
  return (
    <View style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
   
      <View style={styles.row}>
          <ThemedText style={[styles.value, styles.redText]}>{parseFloat(priceUsd).toFixed(2)}</ThemedText>   
          <ThemedText style={styles.value}>1,122.83</ThemedText>
          <ThemedText style={styles.value}>{formatTime()}</ThemedText>
      </View>
    </View>
  )
}

export default TradingHistory

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 17, // Adjust the size if needed
    fontFamily:'MonsterBold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
       fontFamily:'MonsterBold',
  },
  value: {
      fontFamily:'MonsterReg',
    marginTop: 3,
  },
  redText: {
    color: 'red',
  },
})
