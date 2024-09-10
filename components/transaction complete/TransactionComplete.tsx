import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CheckCompleteImage from '@/assets/svg/complete.svg';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useRouter } from 'expo-router';
import { ThemedText } from '../ThemedText';

const TransactionComplete = () => {
  const transactionData = useAppSelector((state) => state.transaction.transactionName);
  const exchangeData = useAppSelector((state) => state.exchange.exchange);
  const router = useRouter();
  const theme = useAppSelector(state => state.theme.theme)

  useEffect(() => {
    const backAction = () => {
      router.push('/(tabs)');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [router]);

  return (
    <View style={styles.container}>
      <CheckCompleteImage />
      <ThemedText style={styles.label}>{transactionData} Successful</ThemedText>
      <ThemedText style={styles.message}>
        You have successfully initiated the transaction. Amount will reflect in wallet within 1 hour.
      </ThemedText>

      {transactionData === 'exchange' && (
        <View style={styles.section}>
          <View>
            <ThemedText>{exchangeData.selectFrom} </ThemedText>
            <ThemedText style={styles.text}>{exchangeData.fromAmount}</ThemedText>
          </View>

          <View style={styles.icon}>
            <AntDesign name="arrowright" size={24} color="black" />
          </View>

          <View>
            <ThemedText>{exchangeData.selectTo}</ThemedText>
            <ThemedText style={styles.text}>{exchangeData.toAmount}</ThemedText>
          </View>
        </View>
      )}
    </View>
  );
};

export default TransactionComplete;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: 'MonsterBold',
    textAlign: 'center',
    marginVertical: 5,
    textTransform: 'capitalize',
    fontSize: 24,
  },
  message: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    fontFamily: 'MonsterReg',
  },
  icon: {
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
  },
  text: {
    fontFamily: 'MonsterBold',
    fontSize: 18,
  },
});
