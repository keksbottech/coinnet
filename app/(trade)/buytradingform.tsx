import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/ui/button/Button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getOrderP2pData } from '@/lib/store/reducers/storeOrders';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker
import { axios } from '@/lib/axios';
import Loading from '@/components/loading/Loading';
import { getEscrowData } from '@/lib/store/reducers/storeEscrowData';
import { ThemedText } from '@/components/ThemedText';

interface NegotiationFormProps {
  sellerFiatRate: number; // seller's fiat rate per coin
  onSubmit: (data: { coinAmount: number; fiatAmount: number }) => void;
}

const P2PNegotiationForm: React.FC<NegotiationFormProps> = ({ sellerFiatRate = 100, onSubmit }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      coinAmount: 0,
      selectedCoin: 'BTC', // Example default value
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const sellerId = useAppSelector(state => state.orders.sellerId);

  const [fiatAmount, setFiatAmount] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [coinValue, setCoinValue] = useState(0); // For holding the value of the selected coin

  const coinAmount = watch('coinAmount', 0); // Keep as string for TextInput
  const coinType = watch('selectedCoin', 'BTC'); // Watch for selected coin

  // Get market data from Redux store
  const marketStoredData = useAppSelector(state => state.market.marketData); // Assuming the state is stored here
  const orderDetails = useAppSelector(state => state.orders.selectedOrder)
  const [isLoading,setIsLoading] = useState(false)
  const theme = useAppSelector(state => state.theme.theme)
  const userData = useAppSelector(state => state.user.user)

  useEffect(() => {
    // Check if coin amount is valid, otherwise default to 0
    const amount = coinAmount ? parseFloat(coinAmount) : 0;
  
    // Perform the calculation using the seller's rate in USD per coin
    if (amount > 0 && sellerFiatRate > 0) {
      // The seller's rate is already in USD, so we only multiply it by the coin amount
      const calculatedFiatAmount = amount * orderDetails?.sellersRate;
      setFiatAmount(calculatedFiatAmount);
    } else {
      setFiatAmount(0); // Default to 0 if values are invalid
    }
  }, [coinAmount, sellerFiatRate]);
  
  const getCoinData = (coinName: string) => {
    return marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === coinName);
  };


  const sendDataToOrderDispatch = async (data: any) => {
    try{
        setIsLoading(true)
    const { coinAmount } = data;

    console.log(coinAmount,'coin amount')
    console.log(orderDetails.limits)
    console.log(+coinAmount > +orderDetails.limits)
    if(+coinAmount > +orderDetails.limits) {
      ToastAndroid.show('coin limit exceeded', ToastAndroid.SHORT);
    }
    else{
    // console.log(coinAmount)
    
    // console.log(orderDetails,'details')

    const body = {
        userId: userData._id,
        offerId: orderDetails?.offerId,
        status:'pending',
        quantity: coinAmount,
        fiatAmount,
        coin: selectedCoin,
        sellerId,
        limits: orderDetails.limits,
        coinRate: orderDetails.sellersRate
    }
    // // sellerId, senderId, message, image, coinTransaction
    const createEscrow = await axios.post('escrow/create', body)

    console.log(createEscrow.data, 'escrow')
    
    const a = {
      senderId: userData?._id,
      receiverId: sellerId,
      escrowId: createEscrow.data.escrow._id
    }

    console.log(a,'id')

    const getEscrowId = await axios.post('escrowId/send', a)
    console.log(getEscrowId.data, 'escrow id')


    ToastAndroid.show('Success!', ToastAndroid.SHORT);

      router.push(`/(trade)/chats/${sellerId}`);
    }
    }
    catch(err){
      ToastAndroid.show('Failed to send request! Seller has Insufficient funds', ToastAndroid.SHORT);
        console.log(err)
    }
    finally{
        setIsLoading(false)
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={[{ flex: 1 },{backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Negotiate Purchase</ThemedText>

        <ThemedText style={styles.label}>Coin Name:</ThemedText>
          <ThemedText style={styles.conversion}>{orderDetails.coin}</ThemedText>

        {/* <Controller
          control={control}
          name="selectedCoin"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Select Coin:</ThemedText>
              <Picker
                selectedValue={value}
                style={[styles.picker, {color:theme?'white':'black'}]}
                onValueChange={(itemValue) => {
                  setSelectedCoin(itemValue);
                  onChange(itemValue);
                }}
              >
                <Picker.Item label="Bitcoin (BTC)" value="BTC" />
                <Picker.Item label="Ethereum (ETH)" value="ETH" />
                <Picker.Item label="Litecoin (LTC)" value="LTC" />
                <Picker.Item label="USDC" value="USDC" />
                <Picker.Item label="BNB" value="BNB" />
              </Picker>
            </View>
          )}
        /> */}

        <Controller
          control={control}
          name="coinAmount"
          rules={{ required: true, min: 0 }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Amount of Coin:</ThemedText>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={value.toString()}
                placeholderTextColor={'#ccc'}
                placeholder='0.00'
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9.]/g, ''); // Allow only numbers and dots
                  onChange(numericValue);
                }}
              />
            </View>
          )}
        />

        <View style={styles.conversionContainer}>
          <ThemedText style={styles.label}>Selected Coin Value:</ThemedText>
          <ThemedText style={styles.conversion}>{coinValue.toFixed(2)} USD</ThemedText>

          <ThemedText style={styles.label}>Sellers Rate in Fiat</ThemedText>
          <ThemedText style={styles.conversion}>{orderDetails.sellersRate} USD</ThemedText>

          <ThemedText style={styles.label}>Sellers Coin Limits</ThemedText>
          <ThemedText style={styles.conversion}> 0 - {orderDetails.limits}</ThemedText>


          <ThemedText style={styles.label}>Estimated Value in Fiat:</ThemedText>
          <ThemedText style={styles.conversion}>{fiatAmount.toFixed(2)} USD</ThemedText>
        </View>
      </View>

      <Button label="Submit Offer" onClick={handleSubmit(sendDataToOrderDispatch)} />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'MonsterBold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'MonsterBold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    // backgroundColor: '#f9f9f9',
    fontFamily: 'MonsterReg',
    color:'#ccc'
  },
  picker: {
    height: 50,
    width: '100%',
  },
  conversionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  conversion: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
    color: '#2a9d8f',
  },
});

export default P2PNegotiationForm;
