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
import { ThemedText } from '../ThemedText';

const WithdrawForFiat = ({ enableBottomSheet, enableBankBottomSheet }: any) => {
  const selectedPayment = useAppSelector(state => state.paymentUrl.paymentMethod);
  const selectedBank = useAppSelector(state => state.paymentUrl.paymentBank);
  const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin);
  const walletBalance = useAppSelector(state => state.wallet.walletTotalBalance);
  const marketStoredData = useAppSelector(state => state.market.marketData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const theme = useAppSelector(state => state.theme.theme)
  const fiatWalletBalance = useAppSelector(state => state.fiatWallet.fiatWalletBalance)

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

  const paypalEmailRules = selectedPayment?.name === 'PayPal' ? {
    required: 'PayPal email is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Enter a valid email address',
    },
  } : {};

  const bankAccountRules = selectedPayment?.name === 'Bank Transfer' ? {
    accountName: {
      required: 'Account name is required',
    },
    accountNumber: {
      required: 'Account number is required',
      minLength: {
        value: 10,
        message: 'Account number must be exactly 10 digits',
      },
      maxLength: {
        value: 10,
        message: 'Account number must be exactly 10 digits',
      },
    },
  } : {};
  

  // Calculate the estimated fiat amount based on the selected coin and entered amount

  useFocusEffect(
    useCallback(() => {
      dispatch(getPaymentBanks({ name: '', bankCode: '', type: '' }))
    }, [dispatch])
  );

  // Handle form submission
  const onSubmit = (data: any) => {
    const baseBody = {
      type: 'nuban',
      name: data.accountName,
      account_number: data.accountNumber,
      currency: 'NGN',
      amount: +data.amount,
      email: data.paypalEmail,
    };

    console.log(selectedPayment.name)

    if (selectedPayment.name === 'Bank Transfer') {
      baseBody.amount = +data.amount;
      console.log('CLICKED')

      // dispatch(getWithdrawalData(baseBody));
      // dispatch(getWithdrawalMethod(selectedPayment));
  
      // router.push('/(trade)/confirmwithdraw');
    }

    console.log('CLICKED')

    dispatch(getWithdrawalData(baseBody));
    dispatch(getWithdrawalMethod(selectedPayment));

    router.push('/(other)/confirmwithdrawforfiat');



  };

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <ThemedText style={styles.headerText}>You withdraw</ThemedText>
              <ThemedText style={styles.amountText}>₦{watchAmount || '0.00'}</ThemedText>
            </View>

            <ThemedText style={styles.label}>Available Balance</ThemedText>
            <View style={styles.balanceContainer}>
              <View>
                <ThemedText style={styles.balanceText}>Quantity</ThemedText>
                <ThemedText style={styles.balanceAmount}>{parseFloat(fiatWalletBalance?.balance?.NGN).toFixed()}</ThemedText>
              </View>
              <ThemedText style={styles.currency}>NGN</ThemedText>
            </View>

            <ThemedText style={styles.label}>Withdraw Amount</ThemedText>
            <Controller
              control={control}
              name="amount"
              rules={{ required: 'Amount is required', min: 1 }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <>
                  <View style={styles.inputContainer}>
                    <ThemedText style={{fontSize:30}}>₦</ThemedText>
                    <TextInput
                    placeholderTextColor={theme ?'#ccc': 'gray'}
                      placeholder="Enter Amount"
                      style={[styles.input,{color:theme ? 'white': 'black'}]}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                  </View>
                  {error && <ThemedText style={styles.errorText}>{error.message}</ThemedText>}
                </>
              )}
            />

            {/* <ThemedText style={styles.label}>Withdraw to</ThemedText>
            <TouchableOpacity onPress={enableBottomSheet} style={[styles.withdrawToContainer, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
              <View style={styles.withdrawToContent}>
                <FontAwesome name="bank" size={24} color={theme?'white':"black"} />
                <View>
                  <ThemedText style={styles.withdrawToText}>{selectedPayment.name ? selectedPayment.name : 'Select withdrawal method'}</ThemedText>
                  <ThemedText style={styles.withdrawToText}>XXXXXXXX</ThemedText>
                </View>
              </View>
              <AntDesign name="down" size={20} color={theme?'white':"black"} />
            </TouchableOpacity> */}

            {/* {selectedPayment?.name === 'PayPal' && (
              <>
                <ThemedText style={styles.label}>Paypal Email Address</ThemedText>
                <Controller
                  control={control}
                  name="paypalEmail"
                  rules={paypalEmailRules}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <View style={styles.inputContainer}>
                        <FontAwesome name="envelope" size={24} color={theme?'white':"black"} />
                        <TextInput
                        placeholderTextColor={theme ?'#ccc': 'gray'}
                          placeholder="Enter PayPal email address"
                          style={[styles.input, {color:theme ? 'white': 'black'}]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          keyboardType="email-address"
                        />
                      </View>
                      {error && <ThemedText style={styles.errorText}>{error.message}</ThemedText>}
                    </>
                  )}
                />
              </>
            )} */}

                <ThemedText style={styles.label}>Choose Bank</ThemedText>
                <TouchableOpacity onPress={enableBankBottomSheet} style={[styles.withdrawToContainer, {backgroundColor:theme ? 'gray': 'white'}]}>
                  <View style={styles.withdrawToContent}>
                    <FontAwesome name="bank" size={24} color={theme?'white':"black"} />
                    <View>
                      <ThemedText style={styles.withdrawToText}>{selectedBank.name}</ThemedText>
                      <ThemedText style={styles.withdrawToText}>XXXXXXXX</ThemedText>
                    </View>
                  </View>
                  <AntDesign name="down" size={20} color={theme?'white':"black"} />
                </TouchableOpacity>

                <ThemedText style={styles.label}>Account Name</ThemedText>
                <Controller
                  control={control}
                  name="accountName"
                  rules={bankAccountRules.accountName}

                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <View style={styles.inputContainer}>
                        <FontAwesome name="user" size={24} color={theme?'white':"black"} />
                        <TextInput
                        placeholderTextColor={theme ?'#ccc': 'gray'}
                          placeholder="Enter account name"
                          style={[styles.input, {color:theme ? 'white': 'black'}]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                      {error && <ThemedText style={styles.errorText}>{error.message}</ThemedText>}
                    </>
                  )}
                />

                <ThemedText style={styles.label}>Account Number</ThemedText>
                <Controller
                  control={control}
                  name="accountNumber"
                  rules={bankAccountRules.accountNumber}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <>
                      <View style={styles.inputContainer}>
                        <FontAwesome name="credit-card" size={24} color={theme?'white':"black"} />
                        <TextInput
                        placeholderTextColor={theme ?'#ccc': 'gray'}
                          placeholder="Enter account number"
                          style={[styles.input, {color:theme ? 'white': 'black'}]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          keyboardType="numeric"
                          maxLength={10}
                        />
                      </View>
                      {error && <ThemedText style={styles.errorText}>{error.message}</ThemedText>}
                    </>
                  )}
                />

          </View>
     
     
        <Button label="Proceed" styles={{position:'relative'}} onClick={handleSubmit(onSubmit)} />

        </ScrollView>
        <ThemedText style={{textAlign:'center', color:'red', fontFamily:'MonsterReg'}}>We only process withdrawals in nigerian currency for now</ThemedText>
      </KeyboardAvoidingView>
      { isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
 fontFamily:'MonsterBold',
  },
  amountText: {
    fontSize: 38,
    fontFamily:'MonsterBold',
    color: '#ccc',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily:'MonsterBold',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 20,
    fontFamily:'MonsterBold',
  },
  balanceAmount: {
    fontSize: 20,
    fontFamily:'MonsterReg'
  },
  currency: {
    fontSize: 20,
    fontFamily:'MonsterBold',
    alignSelf: 'center',
  },
  withdrawToContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
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
        fontFamily:'MonsterReg'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
        fontFamily:'MonsterReg'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: -15,
        fontFamily:'MonsterReg'
  },
});

export default WithdrawForFiat;
