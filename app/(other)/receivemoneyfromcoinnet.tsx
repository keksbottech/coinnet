import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ReceiveMoneyFromCoinnet from '@/components/receive money from coinnet/ReceiveMoneyFromCoinnet';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';

const ReceiveMoneyFromCoinnetPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<ThemedText style={styles.pageHeaderLabel}>Receive money from Coinnet user</ThemedText>}
      />
      <View style={styles.container}>
        <ReceiveMoneyFromCoinnet />
      </View>
    </SafeAreaView>
  );
};

export default ReceiveMoneyFromCoinnetPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10
  },
  container: {
    paddingTop: 50,
    flex: 1
  },
  pageHeaderLabel: {
    fontFamily: 'MonsterBold',
    fontSize: 24
  }
});
