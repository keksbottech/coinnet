import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import SelectCoinsToDepositDrawer from '../select coin/SelectCoinToDeposit';
import Button from '../ui/button/Button';
import Loading from '../loading/Loading';

const TransferInput = () => {
  const selectedCoin = useAppSelector((state) => state.selectedCoin.selectedCoin);
  const userData = useAppSelector((state) => state.user.user);
  const marketStoredData = useAppSelector((state) => state.market.marketData);
  const theme = useAppSelector((state) => state.theme.theme);

  const [isLoading, setIsLoading] = useState(false);
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      address: '',
      note: '',
      coinAmount: '',
    },
  });

  const watchAmount = watch('amount', '');

  // Toggle Bottom Drawer
  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };

  // Calculate Coin Equivalent as Amount in NGN changes
  useEffect(() => {
    if (selectedCoin && watchAmount) {
      const coinData = marketStoredData.find(
        (coin: { CoinInfo: { Name: any } }) => coin.CoinInfo.Name === selectedCoin.symbol
      );
      if (coinData) {
        const usdRate = 1700; // Fixed NGN to USD rate
        const coinRateInUsd = coinData.RAW.USD.PRICE;
        const coinEquivalent = (parseFloat(watchAmount) / usdRate) / coinRateInUsd;
        setValue('coinAmount', coinEquivalent.toFixed(8).toString());
      }
    }
  }, [watchAmount, selectedCoin]);

  const sendCoinToUser = async (data: any) => {
    try {
      setIsLoading(true);
      console.log(data.address)
      const body = {
        userId: userData._id,
        amount: +data.coinAmount,
        coin: selectedCoin?.symbol,
        receiverId: data.address,
        note: data.note,
      };

      const response = await axios.post('wallets/send/coin', body);
      ToastAndroid.show('Transaction successful!', ToastAndroid.SHORT);

      setTimeout(() => {
        router.push('/(tabs)/wallet');
      }, 2000);
      console.log(response.data); // Handle the response as needed
    } catch (err) {
      if (err.response.data.message === 'Receiver wallet not found') {
        ToastAndroid.show('Invalid wallet address!', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Something went wrong... Try again!', ToastAndroid.SHORT);
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
        <View style={styles.container}>
          <ThemedText style={styles.label}>Select Coin</ThemedText>
          <TouchableOpacity onPress={enableBottomDrawer} style={[styles.coin, { backgroundColor: theme ? 'gray' : '#ccc' }]}>
            <View style={styles.coinText}>
              <ThemedText style={styles.coinName}>{selectedCoin?.name}</ThemedText>
              <ThemedText style={styles.coinBalance}>{selectedCoin?.symbol}</ThemedText>
            </View>
            <Ionicons name="chevron-down-outline" size={20} />
          </TouchableOpacity>

          {/* Amount in NGN */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Amount (NGN)</ThemedText>
            <Controller
              control={control}
              name="amount"
              rules={{ required: 'Amount is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { color: theme ? 'white' : 'black' }]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter amount in NGN"
                  keyboardType="numeric"
                  placeholderTextColor={theme ? '#ccc' : 'gray'}
                />
              )}
            />
            {errors.amount && <ThemedText style={styles.errorText}>{errors.amount.message}</ThemedText>}
          </View>

          {/* Equivalent Coin Amount */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Equivalent Coin Amount</ThemedText>
            <Controller
              control={control}
              name="coinAmount"
              render={({ field: { value } }) => (
                <TextInput
                  style={[styles.input, { color: theme ? 'white' : 'black' }]}
                  value={value}
                  editable={false} // Disable editing since it's automatically calculated
                  placeholder="Coin amount"
                  placeholderTextColor={theme ? '#ccc' : 'gray'}
                />
              )}
            />
          </View>

          {/* Wallet Address */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Enter Address</ThemedText>
            <View style={styles.inputWithIcon}>
              <Controller
                control={control}
                name="address"
                rules={{ required: 'Address is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, { color: theme ? 'white' : 'black' }, { flex: 1 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter wallet address"
                    placeholderTextColor={theme ? '#ccc' : 'gray'}
                  />
                )}
              />
              {/* <Ionicons name="qr-code-outline" color={theme ? 'white' : 'black'} size={24} style={styles.icon} /> */}
            </View>
            {errors.address && <ThemedText style={styles.errorText}>{errors.address.message}</ThemedText>}
          </View>

          {/* Note */}
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Description</ThemedText>
            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Optional description"
                />
              )}
            />
          </View>
          <Button onClick={handleSubmit(sendCoinToUser)} label='Next' styles={{position:'relative', top:10}}/>

{isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
        </View>
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'MonsterBold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontFamily: 'MonsterReg',
  },
  coinSelector: {
    marginBottom: 20,
  },
  coin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  coinText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'MonsterMid',
  },
  coinName: {
    fontSize: 16,
    fontFamily: 'MonsterMid',
  },
  coinBalance: {
    fontFamily: 'MonsterMid',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'MonsterReg',
  },
});

export default TransferInput;
