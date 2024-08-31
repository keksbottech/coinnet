import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import SendImage from '@/assets/svg/send.svg'


const TransactionHistory = ({ transaction }:any) => {

  return (
    <View>
    <View style={styles.transactionItem}>
      <View style={styles.header}>
        <Text style={styles.currency}>{transaction.currency}</Text>

        <Text
          style={[
            styles.status,
            transaction.status === 'Succeeded'
              ? styles.succeeded
              : transaction.status === 'Cancelled'
              ? styles.cancelled
              : styles.pending,
          ]}
        >
          {transaction.status}
        </Text>
        <Text style={styles.id}>ID: {transaction.id}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.amount}>Amount: {transaction.amount}</Text>
        <Text style={styles.txid}>TXID: {transaction.txid}</Text>
        <Text style={styles.txid}>RID: {transaction.txid}</Text>
      </View>
      <View>
      <Text style={styles.dateTime}>
          {transaction.date} 
        </Text>
        <Text style={styles.dateTime}>
        {transaction.time}
        </Text>
      </View>

    </View>

    {transaction.type === 'send' && (
        <View style={styles.footer}>
          <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
          <SendImage />
          <View style={{left:10}}>
<Text style={styles.amountUSD}>Send</Text>
<Text style={styles.amountUSD}>monobank</Text>
            </View>
            </View>
          <Text style={styles.amountUSD}>{transaction.amountUSD}</Text>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
      fontFamily:'MonsterReg'
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
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
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical:5
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
});

export default TransactionHistory;
