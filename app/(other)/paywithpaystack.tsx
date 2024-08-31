import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/button/Button';
import PageHeader from '@/components/page header/PageHeader';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Input from '@/components/ui/input/Input';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getPaymentUrl } from '@/lib/store/reducers/storePaymentUrl';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import Loading from '@/components/loading/Loading';
import SelectCoinsToDepositDrawer from '@/components/select coin/SelectCoinToDeposit';
import { useForm, Controller } from 'react-hook-form';

const PayWithPaystackScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector(state => state.user.user);
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin);
  const marketStoredData = useAppSelector(state => state.market.marketData);

  const { control, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      coinAmount: '',
      fiatAmount: '' // This will be updated when the coin is selected
    }
  });

  const coinAmount = watch('coinAmount');
  const fiatAmount = watch('fiatAmount');

  useEffect(() => {
    if (selectedCoin && coinAmount) {
      const coinData = marketStoredData.find((coin: { CoinInfo: { Name: any; }; }) => coin.CoinInfo.Name === selectedCoin.symbol);
      if (coinData) {
        const rate = coinData.RAW.USD.PRICE; // Assuming the rate is in USD
        const estimatedFiat = parseFloat(coinAmount) * rate;
        setValue('fiatAmount', estimatedFiat.toFixed(2).toString()); // Update fiat amount with 2 decimal places
      }
    }
  }, [coinAmount, selectedCoin]);

  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };

  const navigateToPaystackOnboarding = async (data:any) => {
    try {
      setIsLoading(true);
      const { email, name, fiatAmount } = data;

      console.log(email)
      const body = {
        email,
        name,
        amount: fiatAmount,
        userId: userData?._id,
        coin: selectedCoin?.symbol,
        coinAmount
      };

      const response = await axios.post('paystack/initialize', body);

      console.log(response.data);
      console.log(response.data?.message);

      dispatch(getPaymentUrl(response.data.message.data.authorization_url));

      router.push('/(other)/webview');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const changePaymentMethod = () => router.push('/(other)/paymentmethods');

  return (
    <>
      {isLoading && <Loading />}
      <SafeAreaView style={styles.safeArea}>
        <PageHeader
          icon={<FontAwesome name="angle-left" size={24} color="black" />}
          label={<Text style={styles.pageHeaderLabel}>Deposit</Text>}
        />
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
            <View style={styles.container}>
              <Text style={styles.title}>Deposit with Paystack</Text>
              <View style={styles.wrapper}>
                <Text>Select Coin to Buy</Text>
                <TouchableOpacity onPress={enableBottomDrawer} style={styles.withdrawToContainer}>
                  <View style={styles.withdrawToInnerContainer}>
                    <FontAwesome name="bank" size={24} color="black" />
                    <View>
                      <Text style={styles.withdrawToText}>{selectedCoin?.name} </Text>
                      <Text style={styles.withdrawToText}>{selectedCoin?.symbol}</Text>
                    </View>
                  </View>
                  <AntDesign name="down" size={20} color="black" />
                </TouchableOpacity>

                <View style={styles.wrap}>
                  <Text style={styles.labels}>Name:</Text>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                  />
                </View>

                <View style={styles.wrap}>
                  <Text style={styles.labels}>Email:</Text>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                    )}
                  />
                </View>

                <View style={styles.wrap}>
                  <Text style={styles.labels}>Coin Amount:</Text>
                  <Controller
                    control={control}
                    name="coinAmount"
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        onBlur={onBlur}
                        onChangeText={(value) => {
                          onChange(value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </View>

                <View style={styles.wrap}>
                  <Text style={styles.labels}>Amount To Pay</Text>
                  <Controller
                    control={control}
                    name="fiatAmount"
                    render={({ field: { value } }) => (
                      <Input value={value} readOnly />
                    )}
                  />
                </View>
              </View>

              <TouchableOpacity onPress={changePaymentMethod}>
                <Text style={styles.changeMethod}>Change Deposit Method</Text>
              </TouchableOpacity>
              <Button
                styles={styles.button}
                onClick={handleSubmit(navigateToPaystackOnboarding)}
                label='Confirm'
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
    </>
  );
};

export default PayWithPaystackScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10
  },
  keyboardAvoidingView: {
    flex: 1
  },
  scrollViewContentContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    paddingTop: 50
  },
  title: {
    fontFamily: 'MonsterBold',
    fontSize: 18
  },
  wrapper: {
    marginTop: 20
  },
  labels: {
    fontFamily: 'MonsterMid',
    marginBottom: 6
  },
  input: {
    fontFamily: 'MonsterReg'
  },
  wrap: {
    marginVertical: 10
  },
  button: {
    position: 'relative',
    top: 40
  },
  changeMethod: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },
  withdrawToContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  withdrawToInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  withdrawToText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'MonsterMid'
  },
  pageHeaderLabel: {
    fontFamily: 'MonsterBold',
    fontSize: 24
  }
});
