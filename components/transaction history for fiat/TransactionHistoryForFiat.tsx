import { useAppSelector } from '@/hooks/useAppSelector';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

const transactions = [
  {
    id: '1',
    type: 'payment',
    name: 'Onyechere Chukwumeka Favour',
    date: 'Aug 22 at 9:56 AM',
    amount: '- ₦15,000.00',
    status: 'Payment to Onyechere Chukwumeka Favour 4037 is complete',
  },
  {
    id: '2',
    type: 'incoming',
    name: 'Chipper Account Number',
    date: 'Aug 21 at 11:10 AM',
    amount: '+ ₦10,000.00',
    status: 'Incoming Payment to your Account Number 6074261341 - From FAVOUR CHUKWUMEKA ONYECHERE, 080*******37 via PayCom',
  },
  {
    id: '3',
    type: 'failed',
    name: 'Data purchase failed',
    date: 'Aug 21 at 1:29 AM',
    amount: '₦350.00',
    status: 'Data purchase failed',
  },
  {
    id: '4',
    type: 'failed',
    name: 'Data purchase failed',
    date: 'Aug 21 at 1:28 AM',
    amount: '₦350.00',
    status: 'Data purchase failed',
  },
  {
    id: '5',
    type: 'message',
    name: 'You received a message',
    date: 'Aug 19 at 11:13 AM',
    status: 'Your Chipper Virtual Card ending in 9069 has been deactivated.',
  },
  {
    id: '6',
    type: 'withdrawal',
    name: 'Withdrawal from card',
    date: 'Aug 19 at 11:13 AM',
    amount: '$0.27',
    status: 'Withdrawing all funds before permanently revoking card qGfbmb',
  },
];

const TransactionItem = ({ item }) => {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{item.name.charAt(0)}</Text>
        </View>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionDate}>{item.createdAt}</Text>
        <Text style={styles.transactionStatus}>{item.details}</Text>
      </View>
      {item.amount && <Text style={styles.transactionAmount}> {
      item.transactionType === 'transfer' ? `-₦${parseFloat(item.amount).toFixed()}` : item.transactionType === 'deposit' ? `+₦${parseFloat(item.amount).toFixed()}`: item.transactionType === 'coin topup' ? `-₦${parseFloat(item.amount).toFixed()}` : `₦${parseFloat(item.amount).toFixed()}`}</Text>}
    </View>
  );
};

const TransactionHistoryForFiat = () => {
    const transactionHistoryForFiat = useAppSelector(state => state.transactionHistory.transactionHistoryForFiat)
  return (
    <View style={styles.container}>
        {
            transactionHistoryForFiat?.map(item => <TransactionItem key={item._id} item={item} />)
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  iconContainer: {
    marginRight: 16,
  },
  icon: {
    backgroundColor: '#FF6600',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFF',
      fontFamily:'MonsterBold',
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
      fontFamily:'MonsterBold',
    fontSize: 16,
  },
  transactionDate: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
        fontFamily:'MonsterReg'
  },
  transactionStatus: {
    fontSize: 14,
    marginTop: 4,
        fontFamily:'MonsterReg'
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily:'MonsterBold'
  },
});

export default TransactionHistoryForFiat;
