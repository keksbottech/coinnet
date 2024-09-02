import { FlatList, View, Text, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import TradingHeader from '@/components/trading header/TradingHeader';
import TradingCurrencySubHeader from '@/components/trading currency sub header/TradingCurrencySubHeader';
import TradingAmountSubHeader from '@/components/trading currency sub header/TradingAmountSubHeader';
import BuyCoinsP2P from '@/components/buy coins p2p/BuyCoinsP2P';
import { useRouter } from 'expo-router';
import tradingHeaderData from '@/app json/tradingheaderbuysell.json';
import { axios } from '@/lib/axios';
import { Wave } from 'react-native-animated-spinkit';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getOrdersData } from '@/lib/store/reducers/storeOrders';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getSelectedCoinData } from '@/lib/store/reducers/storeSelectedCoin';
import Fontisto from '@expo/vector-icons/Fontisto';
import { TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

const BuyTrading = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.orders.orders);
    const selectedCoin = useAppSelector(state => state.selectedCoin.selectedCoin);
    const [refreshing, setRefreshing] = useState(false)

    const [disableBackPress, setDisableBackPress] = useState(true)


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
          router.push('/(tabs)/trade')

          return true; // Prevent default back press behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [disableBackPress])
  );



    useEffect(() => {
      dispatch(getSelectedCoinData('ALL'))
    }, [])
    useEffect(() => {
      if (selectedCoin === 'ALL') {
        fetchAllOrders();
      } else{
        fetchOrdersBasedOnSelectedCoin();
      }
    }, [selectedCoin, dispatch]);

    const fetchAllOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('orders/get');
        dispatch(getOrdersData(response.data.message));
  
      } catch (err) {
        ToastAndroid.show('Failed to fetch orders! Try again', ToastAndroid.SHORT);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchOrdersBasedOnSelectedCoin = async () => {
      try {
        console.log('coin', selectedCoin);
        setIsLoading(true);

        const body = {
          coin: selectedCoin,
          isPaymentMethod: selectedCoin === 'Bank Transfer' || selectedCoin === 'Paypal' ? true :false,
          paymentType: selectedCoin === 'Bank Transfer' ? 'bank transfer' :  selectedCoin === 'Paypal' ? 'paypal' : ''
        }

        const response = await axios.post(`orders/get`, body);

        console.log(response.data)
        dispatch(getOrdersData(response.data.message));
      } catch (err) {
        ToastAndroid.show('Failed to orders based on selected! Try again', ToastAndroid.SHORT);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchAllOrders()]);
    setRefreshing(false);
  };


    const navigateToChatPreview = () => {
      router.push('/(trade)/chatpreview')
    }
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 10, paddingTop:30 }}>
                <PageHeader
            icon={
       
                          <FontAwesome name="angle-left" size={24} color="black" />
                     
                          }
            other={
              <TouchableOpacity onPress={navigateToChatPreview}>
            <Fontisto name="hipchat" size={24} color="black" />
            </TouchableOpacity>
            }
            label={<Text style={{ fontFamily: 'MonsterBold', fontSize:20 }}>Trading</Text>}
          />
        <View>
  
          <TradingHeader style={{ marginTop: 20 }} data={tradingHeaderData} />
          <TradingCurrencySubHeader />
          <TradingAmountSubHeader />

          <View style={{ alignItems: 'center' }}>
            {isLoading && <Wave size={40} />}
          </View>

          <FlatList
            refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
            showsVerticalScrollIndicator={false}
            data={orders}
            keyExtractor={data => String(data._id)}
            renderItem={({ item }) => (
              <BuyCoinsP2P
                fullname={item.sellersName}
                time={item.createdAt}
                sellersRate={item.sellersRate}
                quantity={item.quantity}
                coin={item.coin}
                limits={item.limits}
                sellerId={item.userId}
                offerId={item._id}
              />
            )}
            contentContainerStyle={{ paddingBottom: 250 }}
          />
                        {/* <BuyCoinsP2P
              /> */}
        </View>
      </SafeAreaView>
    );
};

export default BuyTrading;

const styles = StyleSheet.create({});
