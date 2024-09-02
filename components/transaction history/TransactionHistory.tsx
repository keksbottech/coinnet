import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import SendImage from '@/assets/svg/send.svg'
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Wave } from 'react-native-animated-spinkit';
import { useFocusEffect } from 'expo-router';
import { ScrollView } from 'react-native';


const TransactionHistory = ({ transaction }:any) => {

  function hideStringPartially(str:any) {
    if(!str) return ''
    if (str.length <= 8) return str; // If the string is too short, return it as is
    const firstPart = str.slice(0, 4);
    const lastPart = str.slice(-4);
    return `${firstPart}...${lastPart}`;
}

function formatDateAndTime(dateString:any) {
  const date = new Date(dateString);
  
  // Format the date as DD-MM-YYYY
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  
  // Format the time as HH:MM
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  
  return {
      formattedDate,
      formattedTime
  };
}


  return (

    <View style={styles.container}>
      <View>
    <View style={styles.transactionItem}>
      <View style={styles.header}>
      <Text style={styles.amountUSD}>{transaction.asset}</Text>
        <Text style={styles.currency}>$ {transaction.amountInFiat / 1700}</Text>
        <Text style={styles.amountUSD}> {transaction.coinAmount}</Text>
        <Text
          style={[
            styles.status,
            transaction.status === 'completed'
              ? styles.succeeded
              : transaction.status === 'failed'
              ? styles.cancelled
              : styles.pending,
          ]}
        >
          {transaction.status}
        </Text>
        <Text style={styles.id}>ID: {hideStringPartially(transaction._id)}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.amount}>Amount: {transaction.amount}</Text>
        <Text style={styles.txid}>TXID: {hideStringPartially(transaction.txId)}</Text>
        <Text style={styles.txid}>RID: {hideStringPartially(transaction.rId)}</Text>
      </View>
      <View>
      <Text style={styles.dateTime}>
          {formatDateAndTime(transaction.createdAt).formattedDate} 
        </Text>
        <Text style={styles.dateTime}>
        {formatDateAndTime(transaction.createdAt).formattedTime} 
        </Text>
      </View>
      </View>
      <Text style={styles.label}>Description: {transaction.details}</Text>
    </View>

    {/* {transaction.type === 'send' && (
        <View style={styles.footer}>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          <SendImage />
          <View style={{left:10}}>
<Text style={styles.amountUSD}>Send</Text>
<Text style={styles.amountUSD}>monobank</Text>
            </View>
            </View>
          <Text style={styles.amountUSD}>{transaction.amountInFiat}</Text>
        </View>
      )} */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
      fontFamily:'MonsterReg',
      marginBottom: 15,
      borderBottomColor:'black',
      borderBottomWidth:.3,
      paddingBottom:30
  },
  transactionItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  header: {
    marginBottom: 10,
  },
  currency: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical:5,
    fontFamily:'MonsterBold'
  },
  status: {
    fontWeight: 'bold',
    paddingVertical: 5,
    textAlign:'center',
    borderRadius: 5,
    marginVertical:5,
    textTransform:'capitalize'
  },
  succeeded: {
    backgroundColor: '#d4edda',
    color: '#155724',
    fontFamily:'MonsterReg'
  },
  cancelled: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  pending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  body: {
    marginBottom: 10,
  },
  amount: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'MonsterReg'
  },
  txid: {
    fontSize: 14,
    color: '#888',
      fontFamily:'MonsterReg'
  },
  id: {
    fontSize: 14,
    color: '#888',
      fontFamily:'MonsterReg'
  },
  dateTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
      fontFamily:'MonsterReg'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    justifyContent:'space-between'
  },
  bankLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  amountUSD: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
      fontFamily:'MonsterReg'
  },
  label:{
    fontFamily:'MonsterReg',
    textTransform:'capitalize'
  }
});

export default TransactionHistory;
