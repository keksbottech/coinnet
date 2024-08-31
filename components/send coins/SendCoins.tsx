import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BitcoinImage from '@/assets/svg/bitcoin.svg';
import { Separator } from 'tamagui';
import Button from '../ui/button/Button';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useRouter } from 'expo-router';
import SelectCoinsToDepositDrawer from '../select coin/SelectCoinToDeposit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import Loading from '../loading/Loading';

const SendCoins = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector(state => state.user.user);
  const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin);
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };



  const sendCoinToUser = async (data:any) => {
    try {
      setIsLoading(true);

      const body = {
        userId: userData._id,
        amount: +data.amount,
        coin: selectedCoin.symbol,
        receiverId: data.address,
        note: data.note,
      };

      
      const response = await axios.post('wallets/send/coin', body);
      console.log(response.data); // Handle the response as needed
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <ScrollView style={{flex:1}}>
      <SafeAreaView style={{ padding: 10 }}>
        <View style={styles.container}>
          <Text style={[styles.title, {textAlign:'center'}]}>Please enter only coinnet associated wallet address</Text>
          <Text style={styles.title}>Select Coin</Text>
          <View style={styles.coinSelector}>
            <TouchableOpacity onPress={enableBottomDrawer} style={styles.coin}>
              <BitcoinImage />
              <View style={styles.coinText}>
                <Text style={styles.coinName}>{selectedCoin?.name}</Text>
                <Text style={styles.coinBalance}>{selectedCoin?.balance}</Text>
              </View>
              <Ionicons name="chevron-down-outline" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Address</Text>
            <View style={styles.inputWithIcon}>
              <Controller
                control={control}
                name="address"
                rules={{ required: 'Address is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter wallet address"
                  />
                )}
              />
              <Ionicons name="qr-code-outline" size={24} style={styles.icon} />
            </View>
            {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount</Text>
            <Controller
              control={control}
              name="amount"
              rules={{ required: 'Amount is required' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Note</Text>
            <Controller
              control={control}
              name="note"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Add a note"
                />
              )}
            />
          </View>

          <Text style={[styles.transactionInfo, { paddingBottom: 30 }]}>
            Transaction fees: 0.0000 BTC{'\n'}
            Min: 0.0001 BTC - Max: 2.0006 BTC
          </Text>

          <Separator />
          <Button
            styles={{ top: 10, position: 'relative' }}
            label="Confirm"
            onClick={handleSubmit(sendCoinToUser)}
          />
        </View>
        
      </SafeAreaView>
      
      </ScrollView>
      {isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your styles
  },
  title: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
    marginBottom: 20,
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
    color: 'gray',
    fontFamily: 'MonsterMid',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  input: {
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    marginLeft: 10,
  },
  transactionInfo: {
    marginTop: 20,
    color: 'gray',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'MonsterMid',
  },
  label: {
    fontFamily: 'MonsterMid',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontFamily: 'MonsterMid',
  },
});

export default SendCoins;
