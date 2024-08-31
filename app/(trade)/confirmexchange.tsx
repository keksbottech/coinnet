import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ConfirmationExchange from '@/components/confirmation exchange/ConfirmationExchange';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'expo-router';

const ConfirmExchange = () => {
  const router = useRouter();

  const navigateToAuthenticationCode = () => {
    router.navigate('/(trade)/transactionauthenticationcode');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        other={<AntDesign name="infocirlceo" size={24} color="black" />}
        label={<Text style={styles.headerText}>Confirmation</Text>}
      />
      <View style={styles.container}>
        <ConfirmationExchange />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmExchange;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'MonsterBold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
