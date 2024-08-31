import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
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


      Toast.show({
        type:'success',
        text1:'Order posted successfully',
      })

      setTimeout(() => {
        router.push('/(trade)/buytrading')
      }, 2000); 


    }
    catch(err:any){
      console.log(err.response.data)
      Toast.show({
        type:'error',
        text1:'Failed to post order',
        text2:'Check your internet connection or try again'
      })
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
          <Text style={styles.label}>Select Coin</Text>
          <TouchableOpacity onPress={enableBottomDrawer} style={styles.inputWrapper}>
            <BitcoinImage />
            <View>
            <Text style={styles.text}>{selectedCoin?.name}</Text>
            <Text style={styles.text}>{selectedCoin?.symbol}</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.label}>Payment Type</Text>
          <View style={styles.inputWrapper}>
            {/* <BitcoinImage /> */}
            <Controller
              control={control}
              name="payment"
              rules={{ required: 'payment name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Paypal or Bank Transfer"

                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.payment && <Text style={styles.errorText}>{errors.payment.message}</Text>}
          </View>

          {/* Limits */}
          <Text style={styles.label}>Limits</Text>
          <View style={styles.inputWrapper}>
            {/* <BitcoinImage /> */}
            <Controller
              control={control}
              name="limit"
              rules={{ required: 'Limit is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="1-100"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.limit && <Text style={styles.errorText}>{errors.limit.message}</Text>}
          </View>

          {/* Quantity */}
          <Text style={styles.label}>Quantity</Text>
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
                  style={styles.input}
                  placeholder="0.023554"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.quantity && <Text style={styles.errorText}>{errors.quantity.message}</Text>}
          </View>

          {/* You Sell */}
          <Text style={styles.label}>You Sell</Text>
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
                  style={styles.input}
                  placeholder="$1,000"
                  keyboardType="numeric"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.youSell && <Text style={styles.errorText}>{errors.youSell.message}</Text>}
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
    flex: 1,
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
    backgroundColor: '#f9f9f9',
  },
  picker: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'MonsterReg',
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
