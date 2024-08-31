import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReceiveCoin from '@/components/receive coin/ReceiveCoin';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ReceiveCoinScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.pageHeaderLabel}>Receive Coin</Text>}
      />
      <View style={styles.container}>
        <ReceiveCoin />
      </View>
    </SafeAreaView>
  );
};

export default ReceiveCoinScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10
  },
  container: {
    marginTop: 50,
    flex: 1
  },
  pageHeaderLabel: {
    fontFamily: 'MonsterBold',
    fontSize: 24
  }
});
