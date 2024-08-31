import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/ui/input/Input';
import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { axios } from '@/lib/axios';
import { getPaymentUrl } from '@/lib/store/reducers/storePaymentUrl';
import Loading from '@/components/loading/Loading';
import SelectCoinsToDepositDrawer from '@/components/select coin/SelectCoinToDeposit';

const PayWithPaypalScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector((state) => state.user.user);
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const { control, setValue, handleSubmit, watch } = useForm({
    defaultValues: {
      coinAmount: '',
      fiatAmount: '',
    },
  });
  const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin);
  const marketStoredData = useAppSelector(state => state.market.marketData);

  const coinAmount = watch('coinAmount');

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

  const navigateToPaypalOnboarding = async (data:any) => {
    try {
      setIsLoading(true);
      const { fiatAmount } = data;

      const body = {
        amount: fiatAmount,
        userId: userData._id,
        coinAmount,
        coin: selectedCoin.symbol,
      };

      const response = await axios.post('paypal/initialize', body);

      console.log(response.data);

      dispatch(getPaymentUrl(response.data.approvalUrl));

      router.push('/(other)/webview')
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
      <SafeAreaView style={styles.container}>
        <PageHeader
          icon={<FontAwesome name="angle-left" size={24} color="black" />}
          label={<Text style={styles.headerLabel}>Deposit</Text>}
        />
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={90}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.mainContainer}>
              <Text style={styles.title}>Deposit with Paypal</Text>

              <Text>Select Coin to Buy</Text>
              <TouchableOpacity onPress={enableBottomDrawer} style={styles.withdrawToContainer}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="bank" size={24} color="black" />
                  <View>
                    <Text style={styles.withdrawToText}>{selectedCoin?.name} </Text>
                    <Text style={styles.withdrawToText}>{selectedCoin?.symbol}</Text>
                  </View>
                </View>
                <AntDesign name="down" size={20} color="black" />
              </TouchableOpacity>

              <View style={styles.wrapper}>
                <View style={styles.wrap}>
                  <Text style={styles.labels}>Coin Amount:</Text>
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
                  <Text style={styles.labels}>Amount To Pay</Text>
                  <Controller
                    name="fiatAmount"
                    control={control}
                    render={({ field: { value } }) => (
                      <Input value={value} readOnly={true} />
                    )}
                  />
                </View>
              </View>

              <TouchableOpacity onPress={changePaymentMethod}>
                <Text style={styles.changeMethod}>Change Deposit Method</Text>
              </TouchableOpacity>

              <Button
                onClick={handleSubmit(navigateToPaypalOnboarding)}
                styles={styles.button}
                label="Confirm"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
    </>
  );
};

export default PayWithPaypalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerLabel: {
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  mainContainer: {
    paddingTop: 50,
  },
  title: {
    fontFamily: 'MonsterBold',
    fontSize: 18,
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawToText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'MonsterMid',
  },
  wrapper: {
    marginTop: 20,
  },
  wrap: {
    marginVertical: 10,
  },
  labels: {
    fontFamily: 'MonsterMid',
    marginBottom: 6,
  },
  button: {
    position: 'relative',
    top: 40,
  },
  changeMethod: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
