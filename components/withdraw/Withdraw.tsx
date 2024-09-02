import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppSelector } from '@/hooks/useAppSelector';
import Button from '../ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getWithdrawalData, getWithdrawalMethod } from '@/lib/store/reducers/storeWithdrawal';
import { useForm, Controller } from 'react-hook-form';
import { useFocusEffect } from '@react-navigation/native';
import { getPaymentBanks } from '@/lib/store/reducers/storePaymentUrl';
import SelectCoinsToDepositDrawer from '../select coin/SelectCoinToDeposit';

const Withdraw = ({ enableBottomSheet, enableBankBottomSheet }: any) => {
  const selectedPayment = useAppSelector(state => state.paymentUrl.paymentMethod);
  const selectedBank = useAppSelector(state => state.paymentUrl.paymentBank);
  const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin);
  const walletBalance = useAppSelector(state => state.wallet.walletTotalBalance);
  const marketStoredData = useAppSelector(state => state.market.marketData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);

  // Initialize React Hook Form
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      accountNumber: '',
      paypalEmail: '',
      amount: '',
      coinAmount: '',
      accountName: ''
    },
  });

  // Watch the amount field for changes
  const watchAmount = watch('amount', '');
  const coinAmount = watch('coinAmount');

  // Calculate the estimated fiat amount based on the selected coin and entered amount
  useEffect(() => {
    if (selectedCoin && watchAmount) {
      const coinData = marketStoredData.find((coin: { CoinInfo: { Name: any; }; }) => coin.CoinInfo.Name === selectedCoin.symbol);
      if (coinData) {
        const rate = coinData.RAW.USD.PRICE;
        const estimatedFiat = parseFloat(watchAmount) / rate;
        setValue('coinAmount', estimatedFiat.toFixed(8).toString());
      }
    }
  }, [watchAmount, selectedCoin]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getPaymentBanks({ name: '', bankCode: '', type: '' }))
    }, [dispatch])
  );

  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };

  // Handle form submission
  const onSubmit = (data: any) => {
    const baseBody = {
      type: 'nuban',
      name: data.accountName,
      account_number: data.accountNumber,
      code: selectedBank.code,
      currency: 'NGN',
      amount: +data.amount,
      email: data.paypalEmail,
      coin: selectedCoin.symbol,
      coinAmount: data.coinAmount
    };

    if (selectedPayment.name === 'Bank Transfer') {
      baseBody.amount = +data.amount * 1690;
    }

    dispatch(getWithdrawalData(baseBody));
    dispatch(getWithdrawalMethod(selectedPayment));
    router.push('/(trade)/confirmwithdraw');
  };

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>You withdraw</Text>
              <Text style={styles.amountText}>${watchAmount || '0.00'}</Text>
            </View>

            <Text style={styles.label}>Available Balance</Text>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.balanceText}>Quantity</Text>
                <Text style={styles.balanceAmount}>{parseFloat(walletBalance).toFixed(2)}</Text>
              </View>
              <Text style={styles.currency}>USD</Text>
            </View>

            <View>
              <Text style={[styles.label, { marginTop: 20 }]}>Select Coin to Withdraw from</Text>
              <TouchableOpacity onPress={enableBottomDrawer} style={styles.withdrawToContainer}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="bank" size={24} color="black" />
                  <View>
                    <Text style={styles.withdrawToText}>{selectedCoin?.name}</Text>
                    <Text style={styles.withdrawToText}>{selectedCoin?.symbol}</Text>
                  </View>
                </View>
                <AntDesign name="down" size={20} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Estimated Coin Amount</Text>
            <Controller
              control={control}
              name="coinAmount"
              render={({ field: { value } }) => (
                <View style={styles.inputContainer}>
                  <FontAwesome name="bitcoin" size={24} color="black" />
                  <TextInput
                    placeholder="Estimated Coin"
                    style={styles.input}
                    value={value}
                    editable={false} // Make this field read-only
                  />
                </View>
              )}
            />

            <Text style={styles.label}>Withdraw Amount</Text>
            <Controller
              control={control}
              name="amount"
              rules={{ required: 'Amount is required', min: 1 }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                  <View style={styles.inputContainer}>
                    <FontAwesome name="dollar" size={24} color="black" />
                    <TextInput
                      placeholder="Enter Amount"
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                  </View>
                  {error && <Text style={styles.errorText}>{error.message}</Text>}
                </>
              )}
            />

            <Text style={styles.label}>Withdraw to</Text>
            <TouchableOpacity onPress={enableBottomSheet} style={styles.withdrawToContainer}>
              <View style={styles.withdrawToContent}>
                <FontAwesome name="bank" size={24} color="black" />
                <View>
                  <Text style={styles.withdrawToText}>{selectedPayment.name}</Text>
                  <Text style={styles.withdrawToText}>XXXXXXXX</Text>
                </View>
              </View>
              <AntDesign name="down" size={20} color="black" />
            </TouchableOpacity>

            {selectedPayment?.name === 'PayPal' && (
              <>
                <Text style={styles.label}>Paypal Email Address</Text>
                <Controller
                  control={control}
                  name="paypalEmail"
                  rules={{
                    required: 'PayPal email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Enter a valid email address',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <View style={styles.inputContainer}>
                        <FontAwesome name="envelope" size={24} color="black" />
                        <TextInput
                          placeholder="Enter PayPal email address"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          keyboardType="email-address"
                        />
                      </View>
                      {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                  )}
                />
              </>
            )}

            {selectedPayment?.name === 'Bank Transfer' && (
              <>
                <Text style={styles.label}>Choose Bank</Text>
                <TouchableOpacity onPress={enableBankBottomSheet} style={styles.withdrawToContainer}>
                  <View style={styles.withdrawToContent}>
                    <FontAwesome name="bank" size={24} color="black" />
                    <View>
                      <Text style={styles.withdrawToText}>{selectedBank.name}</Text>
                      <Text style={styles.withdrawToText}>XXXXXXXX</Text>
                    </View>
                  </View>
                  <AntDesign name="down" size={20} color="black" />
                </TouchableOpacity>

                <Text style={styles.label}>Account Name</Text>
                <Controller
                  control={control}
                  name="accountName"
                  rules={{ required: 'Account name is required' }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <View style={styles.inputContainer}>
                        <FontAwesome name="user" size={24} color="black" />
                        <TextInput
                          placeholder="Enter account name"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                      {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                  )}
                />

                <Text style={styles.label}>Account Number</Text>
                <Controller
                  control={control}
                  name="accountNumber"
                  rules={{ required: 'Account number is required', minLength: 10, maxLength: 10 }}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <View style={styles.inputContainer}>
                        <FontAwesome name="credit-card" size={24} color="black" />
                        <TextInput
                          placeholder="Enter account number"
                          style={styles.input}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          keyboardType="numeric"
                          maxLength={10}
                        />
                      </View>
                      {error && <Text style={styles.errorText}>{error.message}</Text>}
                    </>
                  )}
                />
              </>
            )}
          </View>
        <Button label="Proceed" styles={{position:'re'}} onClick={handleSubmit(onSubmit)} />

        </ScrollView>
      </KeyboardAvoidingView>
      { isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 20,
  },
  currency: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  withdrawToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  withdrawToContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawToText: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -15,
  },
});

export default Withdraw;
