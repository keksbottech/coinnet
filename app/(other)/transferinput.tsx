import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TransferInput from '@/components/transfer input/TransferInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const TransferInputPage = () => {
  const theme = useAppSelector(state => state.theme.theme)


  return (
    <ScrollView>
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ?"white":'black' }/>}
        label={<ThemedText style={styles.headerText}>Transfer</ThemedText>}
      />
      <View style={styles.container}>
        <TransferInput />

      </View>
    </SafeAreaView>
    </ScrollView>
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
