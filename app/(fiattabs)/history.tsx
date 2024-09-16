import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/hooks/useAppSelector';
import TransactionHistoryForFiat from '@/components/transaction history for fiat/TransactionHistoryForFiat';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useFocusEffect } from 'expo-router';
import { axios } from '@/lib/axios';
import { getTransactionHistoryForFiat } from '@/lib/store/reducers/storeTransactionHistory';
import { ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Wave } from 'react-native-animated-spinkit';

const HistoryPage = () => {
  const transactionLimits = useAppSelector(state => state.fiatWallet.fiatWalletBalance)
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const theme = useAppSelector(state => state.theme.theme)
  const [refreshing, setRefreshing] = useState(false)


  useFocusEffect(
    useCallback(() => {

      fetchTransactionHistoryForFiat()
    }, [])
  )

  const fetchTransactionHistoryForFiat =async () =>{
    try{
       setIsLoading(true)
       const response = await axios.get(`transaction-history-fiat/${userData._id}`)

       dispatch(getTransactionHistoryForFiat(response.data.transactions))
    }
    catch(err){

      console.log(err)
    }
    finally{
  setIsLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try{
    await Promise.all([fetchTransactionHistoryForFiat()]);
    setRefreshing(false);
    }
    catch(err){
      console.log(err)
    }
  };


  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <View style={styles.header}>
        <ThemedText style={styles.amountText}>₦{parseFloat(transactionLimits?.dailyTransactionLimit?.amountUsed).toFixed()}</ThemedText>
        <View style={styles.analyticsIcon}>

          <MaterialCommunityIcons name="chart-pie" size={24} color="orangered" />
          <Text style={styles.analyticsText}>Analytics</Text>
        </View>
      </View>

      <ThemedText style={styles.spentText}>
        Spent <Text style={styles.monthText}>Today</Text>
      </ThemedText>

<ScrollView
           refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
showsVerticalScrollIndicator={false}>
  <View style={{alignItems:'center'}}>
{isLoading && <Wave size={40} color={theme ? 'white': 'black'}/>}
</View>
      {/* <View style={styles.noTransactionContainer}>
        <FontAwesome5 name="search" size={50} color="gray" />
        <Text style={styles.noTransactionText}>No transactions found</Text>
      </View> */}
      <TransactionHistoryForFiat/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 30,
    fontFamily:'MonsterBold'
  },
  analyticsIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  analyticsText: {
    color: 'orangered',
    fontSize: 16,
    marginLeft: 6,
    fontFamily:'MonsterReg'
  },
  spentText: {

    fontSize: 18,
    marginTop: 16,
       fontFamily:'MonsterReg'
  },
  monthText: {
    color: 'orangered',
    fontSize: 18,
    fontFamily:'MonsterReg'
  },
  noTransactionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTransactionText: {
    color: 'gray',
    fontSize: 18,
    marginTop: 20,
  },
});

export default HistoryPage;
