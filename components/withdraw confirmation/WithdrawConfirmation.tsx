import { useAppSelector } from '@/hooks/useAppSelector';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        <Text style={styles.label}>Bank Account</Text>
        <Text style={styles.value}>{bankData.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Account Number</Text>
        <Text style={styles.value}>{withdrawData.account_number}</Text>
      </View>
      </> :       <View style={styles.row}>
        <Text style={styles.label}>Paypal Email</Text>
        <Text style={styles.value}>{withdrawData.email}</Text>
      </View>
}
{bankData.name &&
      <View style={styles.row}>
        <Text style={styles.label}>Account Name</Text>
        <Text style={styles.value}>{withdrawData.name}</Text>
      </View>
}
      <View style={styles.row}>
        <Text style={styles.label}>Withdrawal Amount</Text>
        <Text style={styles.value}>${withdrawData.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transaction Fee (2%)</Text>
        <Text style={styles.value}>$8.0</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Withdrawal Amount</Text>
        <Text style={styles.value}>${withdrawData.amount + 8 }</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
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
