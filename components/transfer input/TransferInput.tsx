import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ToastAndroid, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import SelectCoinsToDepositDrawer from '../select coin/SelectCoinToDeposit';
import Button from '../ui/button/Button';
import Loading from '../loading/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '../page header/PageHeader';
import { getTransactionDetails } from '@/lib/store/reducers/storeTransferDetails';

const TransferInput = () => {
  const selectedCoin = useAppSelector((state) => state.selectedCoin.selectedCoin);
  const userData = useAppSelector((state) => state.user.user);
  const marketStoredData = useAppSelector((state) => state.market.marketData);
  const theme = useAppSelector((state) => state.theme.theme);
  const [receiverId, setReceiverId] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [username, setUsername] = useState(null)

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      amount: '',
      address: '',
      note: '',
      receiverName:''
    },
  });
  const userName = watch('receiverName', '')

  // Toggle Bottom Drawer
  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };

  const address = watch('address')


  const sendCoinToUser = async (data: any) => {

      const body = {
        userId: userData._id,
        receiverId: data.address,
        note: data.note,
        username: userName,
        amount: +data.amount * 2/100 + +data.amount,
        percent: data.amount
      };

      dispatch(getTransactionDetails(body))

      router.push('/(other)/confirmtransfer')
  };

  const getUserFromAddress = async () => {
    try{
      setIsLoading(true)
      const body = {
        userId: address
      }

      const getUser = await axios.post('user/get/info', body)

      setValue('receiverName',`${getUser.data.message.firstName} ${getUser.data.message.lastName}`)

    }
    catch(err){
      console.log(err.response.data)
      ToastAndroid.show('User not found!', ToastAndroid.SHORT);

    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <>
    {isLoading && <Loading/>}

        <SafeAreaView style={styles.container}>
        {/* <ScrollView style={{flex:1}}> */}
        <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ?"white":'black' }/>}
        label={<ThemedText style={styles.headerText}>Transfer</ThemedText>}
      />

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

          {/* Wallet Address */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Enter Address</ThemedText>
            <View style={styles.inputWithIcon}>
              <Controller
                control={control}
                name="address"
                rules={{ required: 'Address is required' }}
                render={({ field: { onChange, value } }) => (
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                  <TextInput
                    style={[styles.input, { color: theme ? 'white' : 'black' }, { flex: 1 }]}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter wallet address"
                    placeholderTextColor={theme ? '#ccc' : 'gray'}
                  />
                  <TouchableOpacity onPress={getUserFromAddress} style={{backgroundColor:'#eee',padding:10, marginLeft:10}}><Text style={{fontFamily:'MonsterReg'}}>Confirm User</Text></TouchableOpacity>
                  </View>
                )}
              />
              {/* <Ionicons name="qr-code-outline" color={theme ? 'white' : 'black'} size={24} style={styles.icon} /> */}
            </View>
            {errors.address && <ThemedText style={styles.errorText}>{errors.address.message}</ThemedText>}
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>Confirmed Username</ThemedText>
            <Controller
              control={control}
              name="receiverName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Receiver name appears here"
                  readOnly
                />
              )}
            />
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
 
          <Button onClick={handleSubmit(sendCoinToUser)} label='Next' styles={{position:'relative', top:50}}/>
          {/* </ScrollView> */}
        </SafeAreaView>


</>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex:1
  },
  inputGroup: {
    marginBottom: 10,
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
  headerText: {
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
});

export default TransferInput;
