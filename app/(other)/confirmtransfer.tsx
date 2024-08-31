import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ConfirmTransfer from '@/components/confirm transfer/ConfirmTransfer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import PageHeader from '@/components/page header/PageHeader';

const ConfirmTransferPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />} 
        label={<Text style={styles.headerLabel}>Transfer</Text>} 
      />
      <View style={styles.container}>
        <ConfirmTransfer />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmTransferPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  headerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
