import React, { useEffect } from 'react';
import { StyleSheet, Text, View, BackHandler } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import CheckCompleteImage from '@/assets/svg/complete.svg';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useRouter } from 'expo-router';

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
      <Text style={styles.label}>{transactionData} Successful</Text>
      <Text style={styles.message}>
        You have successfully initiated the transaction. Amount will reflect in wallet within 1 hour.
      </Text>

      {transactionData === 'exchange' && (
        <View style={styles.section}>
          <View>
            <Text>{exchangeData.selectFrom} </Text>
            <Text style={styles.text}>{exchangeData.fromAmount}</Text>
          </View>

          <View style={styles.icon}>
            <AntDesign name="arrowright" size={24} color="black" />
          </View>

          <View>
            <Text>{exchangeData.selectTo}</Text>
            <Text style={styles.text}>{exchangeData.toAmount}</Text>
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
