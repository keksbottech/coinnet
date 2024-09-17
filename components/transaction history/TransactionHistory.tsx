import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import SendImage from '@/assets/svg/send.svg'
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Wave } from 'react-native-animated-spinkit';
import { useFocusEffect } from 'expo-router';
import { ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';


const TransactionHistory = ({ transaction }:any) => {
  const theme = useAppSelector(state => state.theme.theme)
  const [ngnRate, setNgnRate] = useState(null)


  useFocusEffect(
    useCallback(() =>{
      getRateInNgn()
    }, [])
  )

  const getRateInNgn = async () => {
    const response = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
    setNgnRate(response.data.usd.ngn)
  }

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

console.log(transaction)


  return (

    <View style={[styles.container, {backgroundColor:theme ? 'rgba(255,255,255,.1)': 'white'}]}>
      <View>
    <View style={[styles.transactionItem]}>
      <View style={styles.header}>
      <ThemedText style={styles.amountUSD}>{transaction.asset}</ThemedText>
        <ThemedText style={styles.currency}>$ {parseFloat(transaction.amountInFiat).toFixed(6)}</ThemedText>
        <ThemedText style={styles.amountUSD}>Coin {parseFloat(transaction.coinAmount)}</ThemedText>
        <ThemedText
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
        </ThemedText>
        <ThemedText style={styles.id}>ID: {hideStringPartially(transaction._id)}</ThemedText>
      </View>
      <View style={styles.body}>
        <ThemedText style={styles.amount}>Amount: {transaction.amount}</ThemedText>
        <ThemedText style={styles.txid}>TXID: {hideStringPartially(transaction.txId)}</ThemedText>
        <ThemedText style={styles.txid}>RID: {hideStringPartially(transaction.rId)}</ThemedText>
      </View>
      <View>
      <ThemedText style={styles.dateTime}>
          {formatDateAndTime(transaction.createdAt).formattedDate} 
        </ThemedText>
        <ThemedText style={styles.dateTime}>
        {formatDateAndTime(transaction.createdAt).formattedTime} 
        </ThemedText>
      </View>
      </View>
      <ThemedText style={styles.label}>Description: {transaction.details}</ThemedText>
    </View>

    {/* {transaction.type === 'send' && (
        <View style={styles.footer}>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          <SendImage />
          <View style={{left:10}}>
<Text style={styles.amountUSD}>Send</ThemedText>
<Text style={styles.amountUSD}>monobank</ThemedText>
            </View>
            </View>
          <ThemedText style={styles.amountUSD}>{transaction.amountInFiat}</ThemedText>
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
      paddingBottom:30,
      borderRadius:15
  },
  transactionItem: {
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
      fontFamily:'MonsterReg'
  },
  label:{
    fontFamily:'MonsterReg',
    textTransform:'capitalize'
  }
});

export default TransactionHistory;
