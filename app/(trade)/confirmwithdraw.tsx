import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather } from '@tamagui/lucide-icons';
import WithdrawConfirmation from '@/components/withdraw confirmation/WithdrawConfirmation';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getTransactionData } from '@/lib/store/reducers/storeTransactionAuthentication';

const ConfirmWithdrawPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const navigateToAuthenticationCode = () => {
    dispatch(getTransactionData('withdrawal'));
    router.push('/(trade)/transactionauthenticationcode');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.headerText}>Confirm Withdraw</Text>}
      />
      <View style={styles.container}>
        <WithdrawConfirmation />
        <Button onClick={navigateToAuthenticationCode} styles={styles.button} label="Withdraw" />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmWithdrawPage;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'MonsterBold',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 50,
  },
});
