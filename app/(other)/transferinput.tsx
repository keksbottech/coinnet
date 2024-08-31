import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TransferInput from '@/components/transfer input/TransferInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';

const TransferInputPage = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.headerText}>Transfer</Text>}
      />
      <View style={styles.container}>
        <TransferInput />
        <Button label='Next' />
      </View>
    </SafeAreaView>
  );
};

export default TransferInputPage;

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
