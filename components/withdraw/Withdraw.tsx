import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppSelector } from '@/hooks/useAppSelector';
import Button from '../ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getWithdrawalData, getWithdrawalMethod } from '@/lib/store/reducers/storeWithdrawal';
import { useForm, Controller } from 'react-hook-form';

const Withdraw = ({ enableBottomSheet, enableBankBottomSheet }:any) => {
  const selectedPayment = useAppSelector(state => state.paymentUrl.paymentMethod);
  const router = useRouter();
  const selectedBank = useAppSelector(state => state.paymentUrl.paymentBank);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.user.user)
  const walletBalance = useAppSelector(state => state.wallet.walletTotalBalance);

  // Initialize React Hook Form
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      accountNumber: '',
      paypalEmail: '',
      amount: '',
      accountName: ''
    },
  });

  // Watch the amount field for changes
  const watchAmount = watch('amount', '');

  // Handle form submission
  const onSubmit = (data:any) => {

      const body = {
        type: 'nuban',
        name: data.accountName,
        account_number: data.accountNumner,
        code: selectedBank.code,
        currency: 'NGN',
        amount:data.amount,
        email:data.paypalEmail
    }
    dispatch(getWithdrawalData(body));

    dispatch(getWithdrawalMethod(selectedPayment))

    router.push('/(trade)/confirmwithdraw');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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

          <Text style={styles.label}>Withdraw Amount</Text>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <FontAwesome name="bank" size={24} color="black" />
                <TextInput
                  placeholder="Enter Amount"
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              </View>
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
                render={({ field: { onChange, onBlur, value } }) => (
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <FontAwesome name="bank" size={24} color="black" />
                    <TextInput
                      placeholder="Enter account name"
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
              />

              <Text style={styles.label}>Account Number</Text>
              <Controller
                control={control}
                name="accountNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <FontAwesome name="bank" size={24} color="black" />
                    <TextInput
                      placeholder="Enter account number"
                      style={styles.input}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                    />
                  </View>
                )}
              />
            </>
          )}

          <Button onClick={handleSubmit(onSubmit)} styles={{ top: 5, position: 'relative' }} label="Continue" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'MonsterBold',
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  label: {
    marginTop: 20,
    color: 'gray',
    fontFamily: 'MonsterBold',
  },
  balanceContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceText: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'MonsterBold',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  currency: {
    fontSize: 18,
    color: 'gray',
    alignSelf: 'flex-end',
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
  withdrawToContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawToText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'MonsterMid',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontFamily: 'MonsterReg',
  },
});

export default Withdraw;
