import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import TradingHeader from '@/components/trading header/TradingHeader';
import SellCoinsForm from '@/components/sell coins/SellCoins';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import tradingHeaderData from '@/app json/tradingheaderbuysell.json';

const SellTradingCoin = () => {
  const router = useRouter();

  const navigateToConfirmBuy = () => {
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <PageHeader
          icon={<FontAwesome name="angle-left" size={24} color="black" />}
          label={<Text style={styles.headerText}>Trading</Text>}
        />
        <TradingHeader style={styles.tradingHeader} data={tradingHeaderData} />
        <SellCoinsForm />
      </View>
    </SafeAreaView>
  );
};

export default SellTradingCoin;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'MonsterBold',
  },
  tradingHeader: {
    marginTop: 20,
  },
});
