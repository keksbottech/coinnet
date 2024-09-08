import { useAppSelector } from '@/hooks/useAppSelector';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

const WithdrawConfirmation = () => {
  const withdrawData = useAppSelector(state => state.withdrawal.withdrawal)
  const bankData = useAppSelector(state => state.paymentUrl.paymentBank)



  console.log(withdrawData, 'withdraw dataaza')
    return (
    <View style={styles.container}>
      {
      bankData.name ?
      <>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Bank Account</ThemedText>
        <ThemedText style={styles.value}>{bankData.name}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Account Number</ThemedText>
        <ThemedText style={styles.value}>{withdrawData.account_number}</ThemedText>
      </View>
      </> :       <View style={styles.row}>
        <ThemedText style={styles.label}>Paypal Email</ThemedText>
        <ThemedText style={styles.value}>{withdrawData.email}</ThemedText>
      </View>
}
{bankData.name &&
      <View style={styles.row}>
        <ThemedText style={styles.label}>Account Name</ThemedText>
        <ThemedText style={styles.value}>{withdrawData.name}</ThemedText>
      </View>
}
      <View style={styles.row}>
        <ThemedText style={styles.label}>Withdrawal Amount</ThemedText>
        <ThemedText style={styles.value}>${withdrawData.amount}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Transaction Fee (2%)</ThemedText>
        <ThemedText style={styles.value}>$8.0</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Total Withdrawal Amount</ThemedText>
        <ThemedText style={styles.value}>${withdrawData.amount + 8 }</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  label: {
    color: 'gray',
    fontSize: 16,
    fontFamily:'MonsterMid'
  },
  value: {
    fontSize: 16,
    fontFamily:'MonsterBold'
  },
});

export default WithdrawConfirmation;
