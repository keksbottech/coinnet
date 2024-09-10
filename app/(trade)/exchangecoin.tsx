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
import { ThemedText } from '@/components/ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';

const ExchangeCoin = () => {
  const router = useRouter();
  const theme = useAppSelector(state => state.theme.theme)

  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ?'white':"black" }/>}
        label={<ThemedText style={styles.headerText}>Trading</ThemedText>}
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
