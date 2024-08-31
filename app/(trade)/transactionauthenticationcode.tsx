import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionAuthenticationCode from '@/components/transaction authentication code/TransactionAuthenticationCode';

const TransactionAuthenticationCodePage = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <TransactionAuthenticationCode />
      </View>
    </SafeAreaView>
  );
};

export default TransactionAuthenticationCodePage;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
  },
});
