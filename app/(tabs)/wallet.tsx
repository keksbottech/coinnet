import { StyleSheet, Text, TouchableOpacity, View, ScrollView, ToastAndroid } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AssetWalletBalance from '@/components/asset wallet balance/AssetWalletBalance';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather } from '@tamagui/lucide-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AssetsActionButton from '@/components/assets action btns/AssetsActionButton';
import AssetsCategories from '@/components/assets categories/AssetsCategories';
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import { useRouter } from 'expo-router';
import MarketChart from '@/components/market chart/MarketChart';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Wave } from 'react-native-animated-spinkit';
import { Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const Wallet = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const userData = useAppSelector(state => state.user.user);
  const [walletAssets, setWalletAssets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const marketStoredData = useAppSelector(state => state.market.marketData);
  const [refreshing, setRefreshing] = useState(false)
  const theme = useAppSelector(state => state.theme.theme)

  useFocusEffect(
    useCallback(() => {
      fetchWalletBalanceCoins();
      return () => {
        console.log('Screen is unfocused, cleaning up...');
      };
    }, [])
  );

  const fetchWalletBalanceCoins = async () => {
    try {
      setIsLoading(true);
      const body = { userId: userData._id };
      const response = await axios.post('wallets/balances', body);
      const btcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BTC');
      const ethData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'ETH');
      const usdcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'USDC');
      const bnbData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BNB');

      console.log(response.data.message)
      const walletAssets = {
        balances: response.data.message,
        btcData,
        ethData,
        usdcData,
        bnbData,
      };
  
      setWalletAssets([walletAssets]);
    } catch (err:any) {
      ToastAndroid.show('Something went wrong fetching your balance. Try refreshing!', ToastAndroid.SHORT);

      console.log(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAssets = walletAssets?.map((asset: { btcData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; balances: { BTC: number; ETH: number; USDC: number; BNB: number; }; ethData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; usdcData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; bnbData: { DISPLAY: { USD: { PRICE: string; CHANGEPCT24HOUR: string; }; }; CoinInfo: { ImageUrl: any; }; }; }) => {
    return [
      {
        name: 'BTC',
        fullName: 'Bitcoin',
        price: parseFloat(asset.btcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        change: parseFloat(asset.btcData?.DISPLAY?.USD.CHANGEPCT24HOUR),
        holdings: asset.balances.BTC,
        value: asset.balances.BTC * parseFloat(asset.btcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        image: asset.btcData?.CoinInfo?.ImageUrl,
      },
      {
        name: 'ETH',
        fullName: 'Ethereum',
        price: parseFloat(asset.ethData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        change: parseFloat(asset.ethData?.DISPLAY?.USD.CHANGEPCT24HOUR),
        holdings: asset.balances.ETH,
        value: asset.balances.ETH * parseFloat(asset.ethData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        image: asset.ethData?.CoinInfo?.ImageUrl,
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
        image: asset.bnbData?.CoinInfo?.ImageUrl,
      },
    ];
  }).flat().filter((asset: { fullName: string; name: string; }) => 
    asset.fullName.toLowerCase() || 
    asset.name.toLowerCase()
  );

  const navigateToSettings = () => {
    router.push('/(other)/settings');
  };

  
  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchWalletBalanceCoins()]);
    setRefreshing(false);
  };

  const navigateToHistory = () => {
    router.push('/(trade)/transactionhistory')
  }

  return (
    <>
    <ScrollView
               refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={{backgroundColor:theme ? '#0F0F0F': 'white'}}
    >
      <SafeAreaView style={styles.safeArea}>
        <PageHeader
        other={<TouchableOpacity onPress={navigateToHistory}>
                    <Ionicons name="time-outline" color={theme?'white':'black'} size={24}  />
        </TouchableOpacity>}
          icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white':"black"} />}
          label={<ThemedText style={[styles.label, styles.text2xl]}>Wallet</ThemedText>}
        />

        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.portfolioButton}>
            <ThemedText style={[styles.textCenter, styles.text2xl]}>Portfolio</ThemedText>
          </TouchableOpacity>
          <AssetsCategories />
          <AssetWalletBalance />
          <AssetsActionButton />
        </View>
        
      </SafeAreaView>


      </ScrollView>
      <BottomDrawer   enablePanDownToClose={false} ui={
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.drawerHeader}>
              <ThemedText style={styles.drawerTitle}>My Assets</ThemedText>
              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.iconMargin}>
                  <Ionicons name="search-outline" size={24} color={theme ? 'white':"black"} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="filter-outline" size={24} color={theme ? 'white':"black"} />
                </TouchableOpacity>
              </View>
            </View>

            {isLoading && (
              <View style={styles.loadingContainer}>
                <Wave size={40} />
              </View>
            )}

            {filteredAssets.map((item: { name: React.Key | null | undefined; image: any; fullName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; price: number; change: number; holdings: number; value: number; }) => (
              <View key={item.name} style={styles.assetContainer}>
                <View style={styles.leftSection}>
                  <View style={styles.iconPlaceholder}>
                    <Image source={{ uri: `https://cryptocompare.com${item.image}` }} width={50} height={50} />
                  </View>
                  <View>
                    <ThemedText style={styles.assetName}>{item.fullName}</ThemedText>
                    <ThemedText style={styles.assetPrice}>{`$${+item.price.toFixed(2)}`}</ThemedText>
                  </View>
                </View>
                <View style={styles.body}>
                  <MarketChart styles={undefined} />
                  <ThemedText style={[{ color: item.change > 0 ? 'green' : 'red' }, styles.fontBold]}>
                    {`${item.change > 0 ? '+' : ''}${item.change.toFixed(2)}%`}
                  </ThemedText>
                </View>
                <View style={styles.rightSection}>
                  <ThemedText style={styles.holdings}>{item.holdings.toFixed(6)}</ThemedText>
                  <ThemedText style={[{ color: item.change > 0 ? 'green' : 'red' }, styles.fontBold]}>
                    {`$${+item.value.toFixed(2)}`}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      } />
    </>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  label: {
   fontFamily:'MonsterBold'
  },
  text2xl: {
    fontSize: 24,
    fontFamily:'MonsterBold'
  },
  contentContainer: {
   
  },
  portfolioButton: {
    marginBottom: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  drawerTitle: {
    fontSize: 18,
   fontFamily:'MonsterBold'
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginRight: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    marginRight: 10,
  },
  assetName: {
   fontFamily:'MonsterBold'
  },
  assetPrice: {
    color: 'gray',
    fontFamily:'MonsterReg'
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontBold: {
   fontFamily:'MonsterBold'
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  holdings: {
   fontFamily:'MonsterBold'
  },
});
