import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TradingHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trading History</Text>

      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Price</Text>
          <Text style={[styles.value, styles.redText]}>30,122.83</Text>
          <Text style={[styles.value, styles.redText]}>30,122.83</Text>
        </View>
        <View>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>1,122.83</Text>
          <Text style={styles.value}>1,122.83</Text>
        </View>
        <View>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>09:31:12</Text>
          <Text style={styles.value}>09:31:12</Text>
        </View>
      </View>
    </View>
  )
}

export default TradingHistory

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 17, // Adjust the size if needed
    fontFamily:'MonsterBold'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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
