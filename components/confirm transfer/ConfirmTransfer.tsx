import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useRouter } from 'expo-router';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import Button from '../ui/button/Button';
import Loading from '../loading/Loading';

const ConfirmTransfer = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const transactionDetails = useAppSelector(state => state.transactionDetails.transactionDetails)

  console.log(transactionDetails)

  const sendCoinToUser = async (data: any) => {
    try {
      setIsLoading(true);

      const response = await axios.post('wallets/send/fiat', transactionDetails);

      ToastAndroid.show('Transaction successful!', ToastAndroid.SHORT);

      setTimeout(() => {
        router.push('/(fiattabs)');
      }, 2000);

      console.log(response.data); // Handle the response as needed
    } catch (err) {
      if (err.response.data.message === 'Receiver wallet not found') {
        ToastAndroid.show('Receiver wallet address not found!', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Insufficent Balance!', ToastAndroid.SHORT);
        // router.push('/(tabs)/wallet')
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    {isLoading && <Loading/>}
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Bank Account</ThemedText>
        <ThemedText style={styles.value}>Coinnet</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Account Number</ThemedText>
        <ThemedText style={styles.value}>{transactionDetails.receiverId}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Account Name</ThemedText>
        <ThemedText style={styles.value}>{transactionDetails.username}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Withdrawal Amount</ThemedText>
        <ThemedText style={[styles.value, styles.bold]}>₦{transactionDetails.amount}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Transaction Fee (2%)</ThemedText>
        <ThemedText style={styles.value}>{+transactionDetails.percent * 2/100}</ThemedText>
      </View>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Total Transfer</ThemedText>
        <ThemedText style={[styles.value, styles.bold]}>₦{transactionDetails.amount}</ThemedText>
      </View>
      <Button onClick={sendCoinToUser} label='Submit' styles={{position:'relative', top:10}}/>

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    marginVertical:15
  },
  label: {
    fontSize: 16,
    color: '#555',
    fontFamily:'MonsterBold'
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontFamily:'MonsterReg'
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default ConfirmTransfer;
