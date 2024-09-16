import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native'; 
import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { getPaymentUrl } from '@/lib/store/reducers/storePaymentUrl';
import Loading from '@/components/loading/Loading';
import SelectCoinsToDepositDrawer from '@/components/select coin/SelectCoinToDeposit';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ThemedText } from '@/components/ThemedText';

const PayWithFlutterwaveScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector((state) => state.user.user);
  const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin);
  const marketStoredData = useAppSelector(state => state.market.marketData);
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const { control, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      coinAmount: '',
      fiatAmount: '',
      name: '',
      email: '',
    },
  });
  const theme = useAppSelector(state => state.theme.theme)
  const coinAmount = watch('coinAmount');
  const fiatAmount = watch('fiatAmount');

  useEffect(() => {
    if (selectedCoin && coinAmount) {
      const coinData = marketStoredData.find((coin: { CoinInfo: { Name: any; }; }) => coin.CoinInfo.Name === selectedCoin.symbol);
      if (coinData) {
        const rate = coinData.RAW.USD.PRICE;
        const estimatedFiat = parseFloat(coinAmount) * rate;
        setValue('fiatAmount', estimatedFiat.toFixed(2).toString());
      }
    }
  }, [coinAmount, selectedCoin]);

  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };

  const navigateToFlutterwaveOnboarding = async (data:any) => {
    try {
      setIsLoading(true);
      const { email, name, fiatAmount } = data;

      const body = {
        email,
        name,
        amount: fiatAmount,
        userId: userData?._id,
        coin: selectedCoin?.symbol,
        phone: userData.phone,
        coinAmount
      };

      const response = await axios.post('flutterwave/initialize', body);

      console.log(response.data.message.data);

      dispatch(getPaymentUrl(response.data.message.data.link));

      router.push('/(other)/webview');
    } catch (err) {
      ToastAndroid.show('Failed to initalize payment! Try again', ToastAndroid.SHORT);

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const changePaymentMethod = () => router.push('/(other)/paymentmethods');

  return (
    <>
      {isLoading && <Loading />}
      <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
        <PageHeader
          icon={<FontAwesome name="angle-left" size={24} color="black" />}
          label={<ThemedText style={styles.headerText}>Deposit</ThemedText>}
        />
        <KeyboardAvoidingView style={styles.mainContent} behavior="padding" keyboardVerticalOffset={100}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ThemedText style={styles.title}>Deposit with Flutterwave</ThemedText>

            <View style={styles.wrapper}>
              <ThemedText style={styles.labels}>Select Coin to Buy</ThemedText>
              <TouchableOpacity onPress={enableBottomDrawer} style={[styles.withdrawToContainer, {backgroundColor:theme ? 'gray': 'white'}]}>
                <View style={styles.coinRow}>
                  <FontAwesome name="bank" size={24} color="black" />
                  <View>
                    <ThemedText style={styles.withdrawToText}>{selectedCoin?.name? selectedCoin?.name : 'Select coin to buy'}</ThemedText>
                    <ThemedText style={styles.withdrawToText}>{selectedCoin?.symbol}</ThemedText>
                  </View>
                </View>
                <AntDesign name="down" size={20} color="black" />
              </TouchableOpacity>

              <View style={styles.wrap}>
                <ThemedText style={styles.labels}>Name:</ThemedText>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input onChangeText={onChange} value={value} />
                  )}
                />
              </View>

              <View style={styles.wrap}>
                <ThemedText style={styles.labels}>Email:</ThemedText>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input onChangeText={onChange} value={value} />
                  )}
                />
              </View>

              <View style={styles.wrap}>
                <ThemedText style={styles.labels}>Coin Amount:</ThemedText>
                <Controller
                  name="coinAmount"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChangeText={(value) => {
                        onChange(value);
                        const convertedAmount = parseFloat(value) * 10000;
                        setValue('fiatAmount', convertedAmount.toString());
                      }}
                      value={value}
                    />
                  )}
                />
              </View>

              <View style={styles.wrap}>
                <ThemedText style={styles.labels}>Amount To Pay</ThemedText>
                <Controller
                  name="fiatAmount"
                  control={control}
                  render={({ field: { value } }) => (
                    <Input value={value} editable={false} />
                  )}
                />
              </View>
            </View>

            <TouchableOpacity onPress={changePaymentMethod}>
              <ThemedText style={styles.changeMethod}>Change Deposit Method</ThemedText>
            </TouchableOpacity>
            <Button onClick={handleSubmit(navigateToFlutterwaveOnboarding)} styles={styles.confirmButton} label="Confirm" />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
    </>
  );
};

export default PayWithFlutterwaveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  mainContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingTop: 50,
    flexGrow: 1,
  },
  title: {
    fontFamily: 'MonsterBold',
    fontSize: 18,
  },
  wrapper: {
    marginTop: 20,
  },
  labels: {
    fontFamily: 'MonsterMid',
    marginBottom: 6,
  },
  wrap: {
    marginVertical: 10,
  },
  changeMethod: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  withdrawToContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawToText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'MonsterMid',
  },
  confirmButton: {
    top: 40,
    position:'relative'
  },
});
