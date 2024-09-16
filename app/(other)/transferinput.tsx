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



        <TransferInput />

  );
};

export default TransferInputPage;

const styles = StyleSheet.create({
  safeAreaView: {
  },
  headerText: {
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
  container: {
    paddingTop: 50,
  },
});
