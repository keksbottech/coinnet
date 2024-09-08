import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import TransactionHistory from '@/components/transaction history/TransactionHistory';
import transactions from '@/app json/transactionhistory.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { Wave } from 'react-native-animated-spinkit';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getTransactionHistory } from '@/lib/store/reducers/storeTransactionHistory';
import { ThemedText } from '@/components/ThemedText';

const TransactionHistoryPage = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const transactionHistoryData = useAppSelector(state => state.transactionHistory.transactionHistory)
  const theme = useAppSelector(state => state.theme.theme)

  useFocusEffect(
    useCallback(() => {
      getTransactions()

      // console.log(transactionHistoryData, 'data')
    }, [])
  )

  

  const getTransactions = async () => {
    try{
      setIsLoading(true)

      const response = await axios.get(`transaction-history/${userData._id}`)

      // console.log(response, 'res')
      dispatch(getTransactionHistory(response.data.transactions))
      // console.log(response.data)

    }
    catch(err){
      // console.log(err)
      ToastAndroid.show('Something went wrong fetching your history! Try again', ToastAndroid.LONG);
    }
    finally{
      setIsLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([getTransactions()]);
    setRefreshing(false);
  };

  return (
  
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
   
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ?'white': "black"} />}
        // other={<AntDesign name="infocirlceo" size={24} color="black" />}
        label={<ThemedText style={styles.headerText}>Transaction History</ThemedText>}
      />
      <View style={styles.container}>
        <View style={{alignItems:'center'}}>
      {isLoading && <Wave size={40}/>}
      </View>
        <FlatList
        showsVerticalScrollIndicator={false}
               refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
          data={transactionHistoryData}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TransactionHistory transaction={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default TransactionHistoryPage;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
});
