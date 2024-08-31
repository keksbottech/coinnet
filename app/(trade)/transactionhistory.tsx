import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import TransactionHistory from '@/components/transaction history/TransactionHistory';
import transactions from '@/app json/transactionhistory.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const TransactionHistoryPage = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        other={<AntDesign name="infocirlceo" size={24} color="black" />}
        label={<Text style={styles.headerText}>Transaction History</Text>}
      />
      <View style={styles.container}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
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
