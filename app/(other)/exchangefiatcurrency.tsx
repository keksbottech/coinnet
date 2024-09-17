import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import CurrencyBottomDrawerToExchange from '@/components/currency bottom drawer/CurrencyBottomDrawerToExchange';
import CurrencyBottomDrawerFromExchange from '@/components/currency bottom drawer/CurrencyBottomDrawerFromExchange';
import { useAppSelector } from '@/hooks/useAppSelector';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import { FontAwesome } from '@expo/vector-icons';
import axiosBase from 'axios';
import { axios } from '@/lib/axios';
import Loading from '@/components/loading/Loading';
import { ThemedText } from '@/components/ThemedText';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useFocusEffect } from '@react-navigation/native';
import { getSelectedCurrencyFromData, getSelectedCurrencyToData } from '@/lib/store/reducers/storeSelectedCurrency';

const CurrencyExchange = () => {
  const [exchangeRates, setExchangeRates] = useState({}); // Store all exchange rates
  const [exchangeRate, setExchangeRate] = useState(1); // Default 1 to avoid 0 in calculations
  const { control,handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      fromCurrency: 'NGN',
      toCurrency: 'GBP',
      fromAmount: '0',
      toAmount: '0',
    },
  });
  const [isBottomDrawerToEnabled, setIsBottomDrawerToEnabled] = useState(false);
  const [isBottomDrawerFromEnabled, setIsBottomDrawerFromEnabled] = useState(false);
  const userData = useAppSelector(state => state.user.user)
  const selectedCurrencyTo = useAppSelector(state => state.selectedCurrency.selectedCurrenyTo);
  const selectedCurrencyFrom = useAppSelector(state => state.selectedCurrency.selectedCurrencyFrom);
  const theme = useAppSelector(state => state.theme.theme);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const fiatWalletBalance = useAppSelector(state => state.fiatWallet.fiatWalletBalance)


  // Watch the form fields we want to observe for live updates
  const fromAmount = watch('fromAmount');
  const fromCurrency = selectedCurrencyFrom?.symbol;
  const toCurrency = selectedCurrencyTo?.symbol;

  useEffect(() => {
   dispatch(getSelectedCurrencyToData({ id: 3, name: 'Ghanian Cedis', symbol: 'GHS', imageUrl: `https://flagsapi.com/GH/shiny/64.png`, balance:fiatWalletBalance?.balance?.GHS  }))
   dispatch(getSelectedCurrencyFromData({ id: 1, name: 'Nigerian Naira', symbol: 'NGN', imageUrl: `https://flagsapi.com/NG/shiny/64.png`, balance:fiatWalletBalance?.balance?.NGN }))
    }, [])
  // Fetch exchange rate data once when the component mounts
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axiosBase.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedCurrencyFrom.symbol.toLowerCase()}.json`); // Example API call

        const data = await response.data;

        console.log(data)
        setExchangeRates(data); // Store all exchange rates
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [selectedCurrencyFrom]);

  // Update the exchange rate when `fromCurrency` or `toCurrency` changes
  useEffect(() => {
    console.log(exchangeRates , 'exchange rate')
    if (fromCurrency && toCurrency && exchangeRates) {
      const rate = exchangeRates[selectedCurrencyFrom?.symbol.toLowerCase()]?.[toCurrency.toLowerCase()];

      console.log(rate,'rate')
      setExchangeRate(rate || 1);  // Set the exchange rate or default to 1 if undefined
    }
  }, [fromCurrency, toCurrency, exchangeRates]);

  // Update the `toAmount` whenever `fromAmount` or the exchange rate changes
  useEffect(() => {
    if (fromAmount && !isNaN(fromAmount)) {
      const convertedAmount = (parseFloat(fromAmount) || 0) * exchangeRate;

      console.log(convertedAmount, 'convertedamount')
      setValue('toAmount', convertedAmount.toString());
    }
  }, [fromAmount, exchangeRate]);

  const enableBottomDrawerTo = () => {
    setIsBottomDrawerToEnabled(!isBottomDrawerToEnabled);
  };

  const enableBottomDrawerFrom = () => {
    setIsBottomDrawerFromEnabled(!isBottomDrawerFromEnabled);
  };

  console.log(selectedCurrencyFrom, 'from')
  console.log(selectedCurrencyTo, 'to')
  const convertCurrency = async(data) =>{
    try{
        setIsLoading(true)

        const body ={
            toAmount: data.toAmount,
            fromAmount,
            userId: userData._id,
            fromCurrency,
            toCurrency
        }

    const response = await axios.post('wallets/convert/fiat', body)
   
    console.log(response.data.message)
    }
    catch(err){
        console.log(err)
    }
    finally{
     setIsLoading(false)
    }
  }

  return (
    <>
    {isLoading && <Loading/>}
      <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
        <PageHeader
          icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white' : 'black'} />}
          label={<ThemedText style={styles.headerText}>Exchange Fiat</ThemedText>}
        />


        <View>
          {/* Exchange rate display */}
          <Text style={styles.exchangeRate}>
            1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
          </Text>

          {/* From Currency Card */}
          <View style={styles.card}>
            <Text style={styles.label}>From</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btnContainer} onPress={enableBottomDrawerFrom}>
                <Image source={{ uri: selectedCurrencyFrom?.imageUrl }} width={30} height={30} />
                <Text style={[styles.label, { left: 5 }]}>{selectedCurrencyFrom?.symbol}</Text>
              </TouchableOpacity>
              <Controller
                control={control}
                rules={{ required: 'Amount is required', pattern: /^\d+(\.\d{1,2})?$/ }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.amountInput}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                    placeholder="0"
                  />
                )}
                name="fromAmount"
              />
            </View>
            {errors.fromAmount && <Text style={styles.errorText}>{errors.fromAmount.message}</Text>}
            <Text style={styles.balance}>Balance: 0.00 {fromCurrency}</Text>
          </View>

          {/* Swap icon */}
          <View style={styles.swapIconContainer}>
            <Icon name="swap-vertical" size={30} color={theme ? 'white' : 'black'} />
          </View>

          {/* To Currency Card */}
          <View style={styles.card}>
            <Text style={styles.label}>To</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btnContainer} onPress={enableBottomDrawerTo}>
                <Image source={{ uri: selectedCurrencyTo?.imageUrl }} width={30} height={30} />
                <Text style={[styles.label, { left: 5 }]}>{selectedCurrencyTo?.symbol}</Text>
              </TouchableOpacity>
              <Controller
                control={control}
                render={({ field: { value } }) => (
                  <TextInput
                    style={styles.amountInput}
                    keyboardType="numeric"
                    value={value}
                    editable={false} // Disable editing for the 'toAmount'
                  />
                )}
                name="toAmount"
              />
            </View>
            <Text style={styles.balance}>Balance: 0.00 {toCurrency}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleSubmit(convertCurrency)} style={styles.btn}>
            <Text style={styles.btnText}>Convert</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {isBottomDrawerToEnabled && <CurrencyBottomDrawerToExchange />}
      {isBottomDrawerFromEnabled && <CurrencyBottomDrawerFromExchange />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  exchangeRate: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    fontFamily: 'MonsterReg',
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontFamily: 'MonsterReg',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    textAlign: 'right',
    paddingHorizontal: 8,
    fontFamily: 'MonsterReg',
  },
  balance: {
    marginTop: 8,
    textAlign: 'right',
    fontFamily: 'MonsterReg',
  },
  swapIconContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'MonsterReg',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'MonsterBold',
  },
  btn:{
    backgroundColor:'orangered',
    padding:20,
    borderRadius:10,
    marginTop:20
  },
  btnText:{
    color:'white',
    textAlign:'center',
    fontFamily:'MonsterBold'
  }
});

export default CurrencyExchange;
