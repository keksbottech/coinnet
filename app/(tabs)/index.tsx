import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import MarketMovers from '@/components/market movers/MarketMovers';
import Portfolio from '@/components/portfolio/Portfolio';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chart from '@/components/trading chart/Chart';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import axiosBase from 'axios';
import { Wave } from 'react-native-animated-spinkit';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getWalletTotalBalance } from '@/lib/store/reducers/storeWalletBalances';
import { getMarketData } from '@/lib/store/reducers/storeMarketData';
import { getUserSession } from '@/lib/store/reducers/storeUserSession';

const Home = () => {
  const router = useRouter();
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isPorfolioLoading, setIsPortfolioLoading] = useState(false)
  const userData = useAppSelector(state => state.user.user)
  const [walletAssets, setWalletAssets] = useState<any>([])
  const dispatch = useAppDispatch()
  const walletBalance = useAppSelector(state => state.wallet.walletTotalBalance)
  const marketStoredData = useAppSelector(state => state.market.marketData)
  const[refreshing, setRefreshing] = useState(false)


  // useEffect(() =>{

  //   if(userData.isPhoneVerified){
  //     return 
  //   }
  //   else {
  //     router.push('/(onboarding)/twostepverification')
  //   }

  // }, [])

  // useEffect(() => {
  //    checkSession()

  // }, [])

  // const checkSession = async () => {
  //   try{
  //     const session = await axios.get('user/session')
  //     console.log('sessoppm',session.data)

  //     dispatch(getUserSession(session))
  //   }
  //   catch(err){
  //     console.log(err)
  //     dispatch(getUserSession(null))
  //   }
  //  }

  useFocusEffect(
    useCallback(() => {
      fetchPrice();
      getTotalWalletBalance()
      fetchWalletBalanceCoins()
      return () => {
        console.log('Screen is unfocused, cleaning up...');
      };
    }, [])
  );
  const getTotalWalletBalance = async () => {
    try{

      const btcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BTC');
      const ethData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'ETH');
      const usdcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'USDC');
      const bnbData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BNB');

      // console.log('btc')
      // console.log(btcRate, 'btc')
      const body = {
        btcDollarRate: parseFloat(btcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        ethDollarRate: parseFloat(ethData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        usdcDollarRate: parseFloat(usdcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        bnbDollarRate: parseFloat(bnbData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        userId:userData?._id
      }


      console.log('body', body)

      const response = await axios.post('wallets/totalbalance', body)

      console.log('assets')

      dispatch(getWalletTotalBalance(response.data.message))

      console.log(response.data.message)
    
    }
    catch(err:any){

      console.log(err.response.data)
    }
   }



  const fetchWalletBalanceCoins = async () => {
    try {
      setIsPortfolioLoading(true)
      const body = {
        userId: userData._id,
      };

      console.log(body)

      console.log('dkd')
      const response = await axios.post('wallets/balances', body);
  
      console.log(response)
      const btcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BTC');
      const ethData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'ETH');
      const usdcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'USDC');
      const bnbData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BNB');

      
      const walletAssets = {
        balances: response.data.message,
        btcData,
        ethData,
        usdcData,
        bnbData,
      };

      console.log(walletAssets)
  
      setWalletAssets([walletAssets]);
  
      // console.log(response.data);
    } catch (err:any) {
      console.log(err.response.data);
    }
    finally{
      setIsPortfolioLoading(false)
    }

  };

  const filteredAssets = walletAssets?.map((asset: { btcData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; balances: { BTC: number; ETH: number; USDC: number; BNB: number; }; ethData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; usdcData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; bnbData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; }) => {

    console.log(asset)
    return [
      {
        name: 'BTC',

        fullName: 'Bitcoin',
        price: parseFloat(asset.btcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        change: parseFloat(asset.btcData?.DISPLAY?.USD.CHANGEPCT24HOUR),
        holdings: asset.balances.BTC,
        value: asset.balances.BTC * parseFloat(asset.btcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        image:asset.btcData?.CoinInfo?.ImageUrl
      },
      {
        name: 'ETH',
        fullName: 'Ethereum',
        price: parseFloat(asset.ethData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        change: parseFloat(asset.ethData?.DISPLAY?.USD.CHANGEPCT24HOUR),
        holdings: asset.balances.ETH,
        value: asset.balances.ETH * parseFloat(asset.ethData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        image:asset.ethData?.CoinInfo?.ImageUrl
      },
      {
        name: 'USDC',
        fullName: 'Tether',
        price: parseFloat(asset.usdcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        change: parseFloat(asset.usdcData?.DISPLAY?.USD.CHANGEPCT24HOUR),
        holdings: asset.balances.USDC,
        value: asset.balances.USDC * parseFloat(asset.usdcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        image:asset.usdcData?.CoinInfo?.ImageUrl
      },
      {
        name: 'BNB',
        fullName: 'Binance Coin',
        price: parseFloat(asset.bnbData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        change: parseFloat(asset.bnbData?.DISPLAY?.USD.CHANGEPCT24HOUR),
        holdings: asset.balances.BNB,
        value: asset.balances.BNB * parseFloat(asset.bnbData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        image:asset.bnbData?.CoinInfo?.ImageUrl
        
      },
    ];
  }).flat().filter((asset: { fullName: string; name: string; }) => 
    asset.fullName.toLowerCase()|| 
    asset.name.toLowerCase()
  );

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

  const navigateToSettings = () => {
    router.push('/(other)/settings');
  };



  useEffect(() => {

    fetchPrice();
  }, [])

  const navigateToProfile = () => {
    router.push('/(other)/profile');
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchWalletBalanceCoins(), getTotalWalletBalance(), fetchPrice()]);
    setRefreshing(false);
  };


  const fetchPrice = async () => {
      try {
        setIsLoading(true)
        const apiKey = 'cdac7eceac8c9e80db25590f3a5886471f2e1a503f593df1b8b84bb8f5fe99b8';
        const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
        
       const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          }
        })
        dispatch(getMarketData(response.data.Data))
        setMarketData(response.data.Data);
      } catch (error) {
        console.error('Error fetching price:', error);
      }
      finally{
        setIsLoading(false)
      }
    
    }


    const navigateToMoreMarketData = () => {
      router.push('/(tabs)/market')
    }

    const navigateToWallet = () => router.push('/(tabs)/wallet')

  return (
  
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PageHeader
          icon={
            <TouchableOpacity onPress={navigateToProfile}>
              <EvilIcons name="user" size={35} color="black" />
            </TouchableOpacity>
          }
          other={
            <TouchableOpacity onPress={navigateToSettings}>
              <Ionicons name="settings-outline" size={24} color="black" />
            </TouchableOpacity>
          }
          label={
            <View style={styles.headerLabel}>
              <Image
                source={require('@/assets/images/logo/logo.png')}
                style={styles.logo}
              />
              <Text style={styles.headerText}>Coinnet</Text>
            </View>
          }
        />

        <ScrollView 
               showsVerticalScrollIndicator={false}
               refreshControl={
                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
               }
        >
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceTitle}>Portfolio Balance</Text>
            <Text style={styles.balanceAmount}>${parseFloat(walletBalance).toFixed(2)}</Text>
            {/* <Text style={styles.balanceChange}>+2.60%</Text> */}
          </View>

          <Chart styles={undefined} />

          <View style={styles.marketMoversHeader}>
            <Text style={styles.marketMoversTitle}>Market Movers</Text>
            <TouchableOpacity onPress={navigateToMoreMarketData}>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems:'center'}}>
          {isLoading &&   <Wave size={48} color="black"/>}

          </View>

          <FlatList
            style={styles.flatList}
            scrollEnabled={true}
            horizontal
            data={marketStoredData}
            renderItem={({ item, index }) => {
              if(index >= 0 && index < 10){
     
              return <MarketMovers  volume={item.DISPLAY?.USD?.VOLUME24HOURTO} priceUsd={item.DISPLAY?.USD?.PRICE} changePercent24Hr={item?.DISPLAY?.USD?.CHANGEPCT24HOUR} symbol={item?.CoinInfo?.Name} image={item?.CoinInfo?.ImageUrl} width={undefined}/>
              }
              else {
                return null
              }
          
            }}
            showsHorizontalScrollIndicator={false}
       
          />
          

          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioTitle}>Portfolio</Text>
            <TouchableOpacity onPress={navigateToWallet}>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.portfolioContainer}>
            <View style={{alignItems:'center'}}>
            {isPorfolioLoading && <Wave size={40}/>}
            </View>
            {
              filteredAssets?.map((item: { holdings: any; fullName: string; price: any; change: string; image: any; }, index: React.Key | null | undefined)=>  <Portfolio key={index} priceUsd={`${item.holdings}`} name={item.fullName} symbol={`$ ${item.price}`} changePercent24Hr={item.change} image={item.image}/>)
            }

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    padding: 1,
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
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
  balanceAmount: {
    fontSize: 32,
    marginTop: 6,
    fontFamily: 'MonsterBold',
  },
  balanceChange: {
    fontFamily: 'MonsterBold',
    marginTop: 5,
  },
  marketMoversHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  marketMoversTitle: {
    fontFamily: 'MonsterBold',
    fontSize: 17,
  },
  moreText: {
    fontSize: 17,
    color: 'orangered',
    fontFamily: 'MonsterBold',
  },
  flatList: {
    padding: 10,
  },
  portfolioHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  portfolioTitle: {
    fontFamily: 'MonsterBold',
    fontSize: 17,
  },
  portfolioContainer: {
    padding: 10,
  },
});
