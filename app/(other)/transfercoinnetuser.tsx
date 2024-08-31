import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TransferToCoinnetUser from '@/components/transer to coinnet user/TransferToCoinnetUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import { FontAwesome } from '@expo/vector-icons';

const TransferToCoinnetUserPage = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.headerText}>Transfer</Text>}
      />
      <View style={styles.container}>
        <TransferToCoinnetUser />
      </View>
    </SafeAreaView>
  );
};

export default TransferToCoinnetUserPage;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
