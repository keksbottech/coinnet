import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import BitcoinImage from '@/assets/svg/bitcoin.svg';
import Button from '../ui/button/Button';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getExchangeData } from '@/lib/store/reducers/storeExchangeData';

interface FormData {
  fromAmount: string;
  toAmount: string;
  selectedFromCoin: string;
  selectedToCoin: string;
}

const ConvertForm = () => {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      fromAmount: '',
      selectedFromCoin: 'bitcoin',
      selectedToCoin: 'ethereum',
    },
  });
  const router = useRouter();
  const marketStoredData = useAppSelector((state) => state.market.marketData);
  const dispatch = useAppDispatch();

  const coinShortForms: Record<string, string> = {
    bitcoin: 'BTC',
    ethereum: 'ETH',
    tether: 'USDC',
    binanceCoin: 'BNB',
  };

  const fromAmount = watch('fromAmount');
  const selectedFromCoin = watch('selectedFromCoin');
  const selectedToCoin = watch('selectedToCoin');



  useEffect(() => {
    console.log(selectedFromCoin, 'from')
    console.log(selectedToCoin, 'to')
    if (fromAmount) {
      const fromCoinData = marketStoredData.find(
        (coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo?.Name === coinShortForms[selectedFromCoin]
      );

      console.log(fromCoinData, 'from data')
      const toCoinData = marketStoredData.find(
        (coin: { CoinInfo: { Name: string; }; }) =>
           coin.CoinInfo?.Name=== coinShortForms[selectedToCoin]
        );

      console.log(toCoinData,'to')
      if (fromCoinData && toCoinData) {
        const fromAmountInUSD = parseFloat(fromAmount) * fromCoinData.RAW?.USD?.PRICE;

        const calculatedToAmount = (fromAmountInUSD / toCoinData.RAW?.USD?.PRICE).toFixed(9);

        setValue('toAmount', calculatedToAmount);

        console.log(fromAmountInUSD)
        console.log(calculatedToAmount)
      } else {
        setValue('toAmount', '');
      }
    } else {
      setValue('toAmount', '');
    }
  }, [fromAmount, selectedFromCoin, selectedToCoin, setValue, marketStoredData]);

  const onSubmit = (data: FormData) => {
    const { fromAmount, toAmount } = data;

    const selectFrom = coinShortForms[selectedFromCoin];
    const selectTo = coinShortForms[selectedToCoin];

    const fromCoinData = marketStoredData.find(
      (coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo?.Name === selectFrom
    );
    const toCoinData = marketStoredData.find(
      (coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo?.Name=== selectTo
    );

    if (fromCoinData && toCoinData) {
      const rate = toCoinData.RAW?.USD?.PRICE / fromCoinData.RAW?.USD?.PRICE;
      dispatch(getExchangeData({ fromAmount, selectFrom, selectTo, toAmount, rate }));
      router.push('/(trade)/confirmexchange');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>You Convert</Text>
        <Text style={styles.amountText}>
          {fromAmount ? `${fromAmount} ${coinShortForms[selectedFromCoin]}` : `0.000 ${coinShortForms[selectedFromCoin]}`}
        </Text>

        <Text style={styles.label}>Convert From</Text>
        <Controller
          control={control}
          name="selectedFromCoin"
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
              <Picker.Item label="Bitcoin (BTC)" value="bitcoin" />
              <Picker.Item label="Tether (USDC)" value="tether" />
              <Picker.Item label="Binance Coin (BNB)" value="binanceCoin" />
              <Picker.Item label="Ethereum (ETH)" value="ethereum" />
            </Picker>
          )}
        />

        <Text style={styles.label}>Convert To</Text>
        <Controller
          control={control}
          name="selectedToCoin"
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
              <Picker.Item label="Ethereum (ETH)" value="ethereum" />
              <Picker.Item label="Bitcoin (BTC)" value="bitcoin" />
              <Picker.Item label="Tether (USDC)" value="tether" />
              <Picker.Item label="Binance Coin (BNB)" value="binanceCoin" />
            </Picker>
          )}
        />

        <Text style={styles.label}>You Receive</Text>
        <View style={styles.receiveContainer}>
          <Controller
            control={control}
            name="fromAmount"
            rules={{
              required: 'Amount is required',
              pattern: {
                value: /^\d+(\.\d{1,6})?$/,
                message: 'Enter a valid amount with up to 6 decimal places',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="0.000"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Text style={styles.currencyText}>{coinShortForms[selectedFromCoin]}</Text>
        </View>
        {errors.fromAmount && <Text style={styles.errorText}>{errors.fromAmount.message}</Text>}

        <Text style={styles.label}>Estimated Received</Text>
        <View style={styles.receiveContainer}>
          <Controller
            control={control}
            name="toAmount"
            render={({ field: { value } }) => <Text style={styles.estimatedText}>{value}</Text>}
          />
          <Text style={styles.currencyText}>{coinShortForms[selectedToCoin]}</Text>
        </View>

        <Text style={styles.label}>Exchange</Text>
        <View style={styles.exchangeContainer}>
          <View style={styles.coinWrapper}>
            <BitcoinImage />
            <View>
              <Text style={styles.coinText}>From</Text>
              <Text style={styles.coinName}>{coinShortForms[selectedFromCoin]}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.exchangeIconWrapper}>
            <Icon name="exchange" size={18} color="#000" />
          </TouchableOpacity>
          <View style={styles.coinWrapper}>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.coinText}>To</Text>
              <Text style={styles.coinName}>{coinShortForms[selectedToCoin]}</Text>
            </View>
            <BitcoinImage />
          </View>
        </View>

        <Button
          styles={{ position: 'relative', top: 20 }}
          label="Buy"
          onClick={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'MonsterBold',
    marginTop: 20,
    textAlign: 'center',
  },
  amountText: {
    fontSize: 30,
    marginTop: 5,
    fontFamily: 'MonsterBold',
    textAlign: 'center',
  },
  receiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'MonsterReg',
  },
  currencyText: {
    fontSize: 16,
    fontFamily: 'MonsterBold',
    marginLeft: 10,
  },
  estimatedText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'MonsterReg',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  exchangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  exchangeIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 14,
    fontFamily: 'MonsterReg',
    color: '#888',
  },
  coinName: {
    fontSize: 16,
    fontFamily: 'MonsterBold',
  },
});

export default ConvertForm;
