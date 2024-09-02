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

  console.log(orderDetails, 'details')
  useEffect(() => {
    // Find the selected coin data from marketStoredData
    const selectedCoinData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === selectedCoin);

    if (selectedCoinData) {
      setCoinValue(selectedCoinData.RAW.USD.PRICE); // Example property for coin price in USD
    } else {
      setCoinValue(0); // Default to 0 if coin data is not found
    }

    const amount = coinAmount || 0;
    const calculatedFiatAmount = amount * coinValue * sellerFiatRate;
    setFiatAmount(calculatedFiatAmount);
  }, [coinAmount, selectedCoin, sellerFiatRate, marketStoredData]);

  const sendDataToOrderDispatch = async (data: any) => {
    try{
        setIsLoading(true)
    const { coinAmount } = data;

    console.log(coinAmount)
    
    console.log(orderDetails,'details')
    const body = {
        userId: sellerId,
        offerId: orderDetails?.offerId,
        status:'pending',
        quantity: coinAmount
    }
    const createEscrow = await axios.post('escrow/create', body)

    ToastAndroid.show('Success!', ToastAndroid.SHORT);

    dispatch(getEscrowData(createEscrow.data.escrow._id))

    dispatch(getOrderP2pData({ coinAmount: parseFloat(coinAmount) || 0, fiatAmount , coin:selectedCoin}));
    router.push(`/(trade)/chats/${sellerId}`);
    }
    catch(err){
      ToastAndroid.show('Failed to send request! Try again', ToastAndroid.SHORT);
        console.log(err)
    }
    finally{
        setIsLoading(false)
    }
  };

  return (
    <>
    {isLoading && <Loading/>}
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Negotiate Purchase</Text>

        <Controller
          control={control}
          name="selectedCoin"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Coin:</Text>
              <Picker
                selectedValue={value}
                style={styles.picker}
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
        />

        <Controller
          control={control}
          name="coinAmount"
          rules={{ required: true, min: 0 }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount of Coin:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={value.toString()}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9.]/g, ''); // Allow only numbers and dots
                  onChange(numericValue);
                }}
              />
            </View>
          )}
        />

        <View style={styles.conversionContainer}>
          <Text style={styles.label}>Selected Coin Value:</Text>
          <Text style={styles.conversion}>{coinValue.toFixed(2)} USD</Text>

          <Text style={styles.label}>Estimated Value in Fiat:</Text>
          <Text style={styles.conversion}>{fiatAmount.toFixed(2)} USD</Text>
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
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    color: '#333',
    fontFamily: 'MonsterBold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    fontFamily: 'MonsterReg',
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
