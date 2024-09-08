import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionAuthenticationCode from '@/components/transaction authentication code/TransactionAuthenticationCode';
import { useAppSelector } from '@/hooks/useAppSelector';

const TransactionAuthenticationCodePage = () => {
  const theme = useAppSelector(state => state.theme.theme)
  
  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
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
