import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import BitcoinImage from '@/assets/svg/bitcoin.svg';
import SelectCoinsToDepositDrawer from '../select coin/SelectCoinToDeposit';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import Loading from '../loading/Loading';
import Toast from 'react-native-toast-message';
import { getSelectedCoinData } from '@/lib/store/reducers/storeSelectedCoin';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Button from '../ui/button/Button';
import { useRouter } from 'expo-router';
import { ThemedText } from '../ThemedText';

// Define the types for your form data
interface FormValues {
  limit: string;
  quantity: string;
  youSell: string;
  account: string;
  bank: string;
payment:string;
}

const SellCoinForm: React.FC = () => {
  const [selectedLimit, setSelectedLimit] = useState('limit1');
  const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin)
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false)
  const dispatch = useAppDispatch()
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const router = useRouter()

  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };


  // useEffect(() => {
  //   dispatch(getSelectedCoinData('Bitcoin'))
  // }, [])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try{
      setIsLoading(true)
      const {limit, quantity, youSell, account, payment} = data
      console.log(data);

      const body ={
        userId: userData._id,
        limits:limit,
        quantity,
        sellersRate: youSell,
        coin: selectedCoin.symbol,
        sellersName: userData?.firstName + ' ' + userData?.lastName,
        sellersImage: userData?.profileImage,
        paymentType: payment.toLowerCase()
      }
      
      const response = await axios.post('orders/post', body)

      console.log(response.data)

      ToastAndroid.show('Order posted successfully', ToastAndroid.SHORT);

      setTimeout(() => {
        router.push('/(trade)/buytrading')
      }, 2000); 


    }
    catch(err:any){
      console.log(err.response.data)
      if(err.response.data.message === 'You have insufficient funds for the sell'){
        ToastAndroid.show('Failed to post order! You have insufficent funds', ToastAndroid.SHORT);
      }
      else{
        ToastAndroid.show('Failed to post order! Try again', ToastAndroid.SHORT);
      }
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
          <Toast/>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Select Coin */}
          <ThemedText style={styles.label}>Select Coin</ThemedText>
          <TouchableOpacity onPress={enableBottomDrawer} style={styles.inputWrapper}>
            {/* <Image source={{uri:selectedCoin.image}} /> */}
            {
              selectedCoin?.name ? '' :      <ThemedText>Tap to Select Coin</ThemedText>
            }
       
            <View>
            <ThemedText style={styles.text}>{selectedCoin?.name}</ThemedText>
            <ThemedText style={styles.text}>{selectedCoin?.symbol}</ThemedText>
            </View>
          </TouchableOpacity>

          <ThemedText style={styles.label}>Payment Type</ThemedText>
          <View style={styles.inputWrapper}>
            {/* <BitcoinImage /> */}
            <Controller
              control={control}
              name="payment"
              rules={{ required: 'payment name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                placeholderTextColor={'#ccc'}
                  style={styles.input}
                  placeholder="Paypal or Bank Transfer"

                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.payment && <ThemedText style={styles.errorText}>{errors.payment.message}</ThemedText>}
          </View>

          {/* Limits */}
          <ThemedText style={styles.label}>Limits</ThemedText>
          <View style={styles.inputWrapper}>
            {/* <BitcoinImage /> */}
            <Controller
              control={control}
              name="limit"
              rules={{ required: 'Limit is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                placeholderTextColor={'#ccc'}
                  style={styles.input}
                  placeholder="1-100"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.limit && <ThemedText style={styles.errorText}>{errors.limit.message}</ThemedText>}
          </View>

          {/* Quantity */}
          <ThemedText style={styles.label}>Quantity</ThemedText>
          <View style={styles.inputWrapper}>
            {/* <BitcoinImage /> */}
            <Controller
              control={control}
              name="quantity"
              rules={{
                required: 'Quantity is required',
                pattern: {
                  value: /^[0-9]*\.?[0-9]+$/,
                  message: 'Invalid quantity'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                placeholderTextColor={'#ccc'}
                  style={styles.input}
                  placeholder="0.023554"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.quantity && <ThemedText style={styles.errorText}>{errors.quantity.message}</ThemedText>}
          </View>

          {/* You Sell */}
          <ThemedText style={styles.label}>You Sell</ThemedText>
          <View style={styles.inputWrapper}>
            {/* <BitcoinImage /> */}
            <Controller
              control={control}
              name="youSell"
              rules={{
                required: 'Amount to sell is required',
                pattern: {
                  value: /^[0-9]*\.?[0-9]+$/,
                  message: 'Invalid amount'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                placeholderTextColor={'#ccc'}
                  style={styles.input}
                  placeholder="$1,000"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.youSell && <ThemedText style={styles.errorText}>{errors.youSell.message}</ThemedText>}
          </View>

          <View style={styles.buttonWrapper}>
          <Button onClick={handleSubmit(onSubmit)} styles={{position:'relative', top:50}} label='Sell'/>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    {isBottomDrawerEnabled && <SelectCoinsToDepositDrawer />}
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
  
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'MonsterBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,

  },
  picker: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'MonsterReg',
    color:'#ccc'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    fontFamily:'MonsterReg'
  },
  buttonWrapper: {
    marginTop: 20,
  },
  text:{
    fontFamily:'MonsterMid',
    left:10
  }
});

export default SellCoinForm;
