import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import TransactionComplete from '@/components/transaction complete/TransactionComplete';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/button/Button';

const TransactionCompletePage = () => {
  const router = useRouter();

  const navigateToTransactionHistory = () => {
    router.push('/(trade)/transactionhistory');
  };





  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        other={<AntDesign name="infocirlceo" size={24} color="black" />}
        label={<Text style={styles.headerText}>Transaction Completed</Text>}
      />
      <View style={styles.container}>
        <TransactionComplete />
        <Button
          label="Transaction History"
          styles={styles.button}
          onClick={navigateToTransactionHistory}
        />
      </View>
    </SafeAreaView>
  );
};

export default TransactionCompletePage;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: 80,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  button: {
    position: 'absolute',
    bottom: 120,
  },
});
