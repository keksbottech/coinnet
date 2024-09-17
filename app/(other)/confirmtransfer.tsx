import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ConfirmTransfer from '@/components/confirm transfer/ConfirmTransfer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import PageHeader from '@/components/page header/PageHeader';
import { ThemedText } from '@/components/ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';

const ConfirmTransferPage = () => {
  const theme = useAppSelector(state => state.theme.theme)
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color={theme ?'white': "black"} />} 
        label={<ThemedText style={styles.headerLabel}>Confirm Transfer</ThemedText>} 
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
    fontFamily:'MonsterBold'
  },
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
