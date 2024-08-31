import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import TradingHeader from '@/components/trading header/TradingHeader';
import tradingHeaderData from '@/app json/tradingheaderbuysell.json';
import ExchangeCrypto from '@/components/exchange crypto/ExchangeCrypto';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const ExchangeCoin = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.headerText}>Trading</Text>}
      />
      <TradingHeader style={styles.tradingHeader} data={tradingHeaderData} />
      <ExchangeCrypto />
    </SafeAreaView>
  );
};

export default ExchangeCoin;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'MonsterBold',
  },
  tradingHeader: {
    marginTop: 20,
  },
});
