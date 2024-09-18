import { BackHandler, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { ThemedText } from '@/components/ThemedText'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useRouter } from 'expo-router'
import TradingHeaderPeriod from '@/components/trading header period/TradingHeaderPeriod'
import { ScrollView } from 'react-native'
import SupportActionButtons from '@/components/support action buttons/SupportActionButtons'
import ShowAccountBottomDrawer from '@/components/show account bottom drawer/ShowAccountBottomDrawer'
import { axios } from '@/lib/axios'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getFiatWalletBalance } from '@/lib/store/reducers/storeFiatWalletBalance'
import { useFocusEffect } from '@react-navigation/native'
import TransactionHistoryForFiat from '@/components/transaction history for fiat/TransactionHistoryForFiat'
import { getTransactionHistoryForFiat } from '@/lib/store/reducers/storeTransactionHistory'
import CurrencyBottomDrawer from '@/components/currency bottom drawer/CurrencyBottomDrawer'
import Feather from '@expo/vector-icons/Feather';
import { getSelectedCurrencyData } from '@/lib/store/reducers/storeSelectedCurrency'
import { Wave } from 'react-native-animated-spinkit'
import { ToastAndroid } from 'react-native'
import { getTransactionFallback } from '@/lib/store/reducers/storeTransferDetails'

const FiatPage = () => {
  const theme = useAppSelector(state => state.theme.theme)
const router = useRouter()
const [refreshing, setRefreshing] = useState(false)
const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false)
const [walletBalance, setWalleBalance] = useState(null)
const userData = useAppSelector(state => state.user.user) 
const dispatch = useAppDispatch() 
const [isLoading, setIsLoading] = useState(false)
const [isBottomCurrencyDrawerEnabled, setIsBottomCurrencyDrawerEnabled] = useState(false)
const selectedCurrency = useAppSelector(state => state.selectedCurrency.selectedCurrency)
const toggleBalanceShown = useAppSelector(state => state.toggle.toggleBalanceShown)


useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      // Prevent back navigation
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])
);



useFocusEffect(
  useCallback(() =>{
    dispatch(getTransactionFallback(null))
    fetchDataFromFunctions()
  }, [])
)

const fetchDataFromFunctions = async () => {
  try{
  setIsLoading(true)
  await Promise.all([fetchUserWalletBalance(),
    fetchTransactionHistoryForFiat()]);
  }
  catch(err){
    console.log(err)
    ToastAndroid.show('Error fetching data! Try again', ToastAndroid.SHORT);
    console.log(err)
  }
  finally{
    setIsLoading(false)

  }
}


const fetchTransactionHistoryForFiat =async () =>{
  try{
     setIsLoading(true)
     console.log('hey')

     const [responseForMainTransactionHistory, responseForRecievedTransferTransaction] = await Promise.all([
      axios.get(`transaction-history-fiat/${userData._id}`),
      axios.post(`transaction-history-fiat/receiver`, {receiverId: userData._id})
     ])

     console.log(responseForMainTransactionHistory.data, responseForRecievedTransferTransaction.data, 'both')

     const mergedTransactions = [
      ...responseForMainTransactionHistory.data.message,
       ...responseForRecievedTransferTransaction.data.message
     ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))


  
     dispatch(getTransactionHistoryForFiat(mergedTransactions))
  }
  catch(err){

    if(err.response.data.message === 'No transfer fiat for receiver'){
      const responseForMainTransactionHistory = await axios.get(`transaction-history-fiat/${userData._id}`)
      
     dispatch(getTransactionHistoryForFiat(responseForMainTransactionHistory.data.message))
    }
    console.log(err, 'error')
  }
  finally{
setIsLoading(false)
  }
}

const fetchUserWalletBalance = async () =>{
  try{
    const body ={
      userId: userData._id
    
    }
      const response = await axios.post('wallets/fiat/balances', body)

      console.log(response?.data?.messsage, 'wallet balance')

      dispatch(getSelectedCurrencyData({ id: 1, name: 'Nigerian Naira', symbol: 'NGN', imageUrl: `https://flagsapi.com/NG/shiny/64.png`, balance:response.data.message.balance.NGN}))

      
      dispatch(getFiatWalletBalance(response.data.message))
      setWalleBalance(response.data.message.balance)
  }
  catch(err){
    console.log(err)
  }
  finally{

  }
}

const enableBottomDrawer = () =>{
  setIsBottomDrawerEnabled(!isBottomDrawerEnabled)
}
  const navigateToSettings = () => {
    router.push('/(other)/settings');
  };

  const navigateToProfile = () => {
    router.push('/(other)/profile');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try{
      setIsLoading(true)
    await Promise.all([fetchUserWalletBalance(),
      fetchTransactionHistoryForFiat()]);
    setRefreshing(false);
    }
    catch(err){
      console.log(err)
    }
    finally{
      setIsLoading(false)
    }
  };

const navigateToTopup = () => {
  router.push('/(other)/paymentmethodsforfiat')
}

const navigateToTransferFiat = () => {
  console.log('clicked')
  router.push('/(other)/transferinput')
}

const navigateToWithdrawFiat = () => {
  router.push('/(other)/withdrawforfiat')
}
const enableCurrencyBottomDrawer = () => {
  setIsBottomCurrencyDrawerEnabled(!isBottomCurrencyDrawerEnabled)
}

const navigateToExchange = () => {
   router.push('/(other)/exchangefiatcurrency')
}

const navigateToTransactionHistory = () => {
  router.push('/(fiattabs)/history')
}

  return (
    <>
         <SafeAreaView style={[styles.safeArea,{backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <View style={styles.container}>
        <PageHeader
          icon={
            <TouchableOpacity onPress={navigateToProfile}>
              <EvilIcons name="user" size={35} color={theme ? 'white': "black"} />
            </TouchableOpacity>
          }
          other={
            <TouchableOpacity onPress={navigateToSettings}>
              <Ionicons color={theme ? 'white': 'black'} name="settings-outline" size={24} color={theme ? 'white': "black"} />
            </TouchableOpacity>
          }
          label={
            <View style={styles.headerLabel}>
              <Image
                source={require('@/assets/images/logo/logo.png')}
                style={styles.logo}
              />
              <ThemedText style={styles.headerText}>Coinnet</ThemedText>
            </View>
          }
        />
        <TradingHeaderPeriod data={[{id:0, name:'crypto', isSelected: true}, {id:1, name:'fiat', isSelected: true}]} style={undefined} />

        
        <ScrollView 
                 refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
        showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={{alignItems:'center'}}>
        {isLoading && <Wave size={40} color={theme ? 'white': 'black'}/>}
        </View>
<SupportActionButtons enableBottomDrawer={enableCurrencyBottomDrawer}/>

        {/* Balance Section */}
        <View style={styles.balanceSection}>
          <ThemedText style={styles.balanceLabel}>Your {selectedCurrency?.symbol} Balance</ThemedText>
          <ThemedText style={styles.balanceAmount}>{selectedCurrency?.symbol === 'NGN'? '₦' : selectedCurrency?.symbol === 'USD'?'$':selectedCurrency?.symbol === 'GHS'? '₵':selectedCurrency?.symbol === 'ZAR'? 'R':selectedCurrency?.symbol === 'EUR'? '€':''}{toggleBalanceShown ? '*****': parseFloat(selectedCurrency?.balance).toFixed()}</ThemedText>
          <TouchableOpacity onPress={enableBottomDrawer} style={styles.accountButton}>
            <Text style={styles.accountText}>Main Account</Text>
            <Ionicons color={'black'} name="chevron-down-outline" size={16} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={navigateToTopup} style={styles.actionButton}>
            <Ionicons color={theme ? 'white': 'black'} name="add-circle-outline" size={24} />
            <ThemedText style={styles.actionText}>Top-Up</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToTransferFiat} style={styles.actionButton}>
          <Feather name="upload" size={24} color={theme ? 'white': 'black'} />
            <ThemedText style={styles.actionText}>Send</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToExchange} style={styles.actionButton}>
            <Ionicons color={theme ? 'white': 'black'} name="swap-horizontal-outline" size={24} />
            <ThemedText style={styles.actionText}>Exchange</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToWithdrawFiat} style={styles.actionButton}>
          <Feather name="download" size={24} color={theme ? 'white': 'black'} />
            <ThemedText style={styles.actionText}>Withdraw</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Transactions */}
        <View style={styles.transactionsSection}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <ThemedText style={styles.transactionsLabel}>Your Transactions</ThemedText>
          <TouchableOpacity onPress={navigateToTransactionHistory}>
            <Text style={{color:'orangered', fontFamily:'MonsterBold',fontSize:15}}>More</Text>
          </TouchableOpacity>
          </View>
           {/* Add your transactions here */}
           <TransactionHistoryForFiat filterToFive={true}/>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
    {isBottomDrawerEnabled && <ShowAccountBottomDrawer/>}
    {isBottomCurrencyDrawerEnabled && <CurrencyBottomDrawer/>}
    </>
  )
}

export default FiatPage

const styles = StyleSheet.create({
  safeArea: {
    padding: 1,
    flex: 1,
  },
  headerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'MonsterBold',
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    marginLeft: 5,
    fontFamily: 'MonsterBold',
    fontSize: 24, // Adjust the size if needed
  },
  balanceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 15,
  },
  balanceTitle: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  balanceSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#aaa',
    fontSize: 16,
  },
  balanceAmount: {
   
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  accountText: {
    marginRight: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
   
    marginTop: 8,
  },
  transactionsSection: {
    marginTop: 32,
  },
  transactionsLabel: {
   
    fontSize: 18,
    marginBottom: 16,
  }
})