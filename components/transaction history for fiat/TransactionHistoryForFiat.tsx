import { useAppSelector } from '@/hooks/useAppSelector';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';

const TransactionItem = ({ item }) => {
    const userData = useAppSelector(state => state.user.user)

    function formatDateAndTime(dateString:any) {
        const date = new Date(item.createdAt);
        
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
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{item.name.charAt(0)}</Text>
        </View>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{userData._id === item.receiverIdForTransfer ? 'You just got a payment':item.name}</Text>
        <Text style={styles.transactionDate}>Date: {formatDateAndTime().formattedDate} Time: {formatDateAndTime().formattedTime} </Text>
        <Text style={styles.transactionStatus}>{userData._id === item.receiverIdForTransfer  ? item.receiverNote:item.details}</Text>
      </View>
      {item.amount && <Text style={styles.transactionAmount}> {
      item.transactionType === 'transfer' ? userData._id === item.receiverIdForTransfer  ? `+₦${parseFloat(item.amount).toFixed()}` : `-₦${parseFloat(item.amount).toFixed()}` : item.transactionType === 'deposit' ? `+₦${parseFloat(item.amount).toFixed()}`: item.transactionType === 'coin topup' ? `-₦${parseFloat(item.amount).toFixed()}` : `₦${parseFloat(item.amount).toFixed()}`}</Text>}
    </View>
  );
};

const TransactionHistoryForFiat = () => {
    const transactionHistoryForFiat = useAppSelector(state => state.transactionHistory.transactionHistoryForFiat)

    console.log(transactionHistoryForFiat, 'k')
  return (
    <View style={styles.container}>
        {
          transactionHistoryForFiat &&  transactionHistoryForFiat.length > 0 ?  transactionHistoryForFiat?.map(item => <TransactionItem key={item._id} item={item} />):
            <View style={styles.noTransactionContainer}>
        <FontAwesome5 name="search" size={50} color="gray" />
        <Text style={styles.noTransactionText}>No transactions found</Text>
      </View> 
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
  noTransactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:100
  },
  noTransactionText: {
    color: 'gray',
    fontSize: 18,
    marginTop: 20,
  },
});

export default TransactionHistoryForFiat;
