import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AssetWalletBalance from '@/components/asset wallet balance/AssetWalletBalance'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageHeader from '@/components/page header/PageHeader'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Feather } from '@tamagui/lucide-icons'
import Ionicons from '@expo/vector-icons/Ionicons';
import AssetsActionButton from '@/components/assets action btns/AssetsActionButton'
import AssetsCategories from '@/components/assets categories/AssetsCategories'
import BottomDrawer from '@/components/bottom drawer/BottomDrawer'
import { useRouter } from 'expo-router'
import MarketChart from '@/components/market chart/MarketChart'
import WebView from 'react-native-webview'

const assets = [
  { id: '1', name: 'BTC', fullName: 'Bitcoin', price: 30113.80, change: 2.76, holdings: 0.042148, value: 1270.10 },
  { id: '2', name: 'ETH', fullName: 'Ethereum', price: 1801.10, change: -1.02, holdings: 0.014914, value: 270.10 },
  { id: '3', name: 'ATOM', fullName: 'Cosmos', price: 8.87, change: 2.05, holdings: 108.427, value: 961.75 },
  { id: '4', name: 'CRO', fullName: 'Crypto.com Coin', price: 0.11765, change: 2.38, holdings: 1616.914, value: 190.23 },
  { id: '5', name: 'ADA', fullName: 'Cardano', price: 0.49, change: -1.24, holdings: 138.8775, value: 68.05 },
  { id: '6', name: 'ADA', fullName: 'Cardano', price: 1.02, change: 0.01, holdings: 1, value: 1.02 },
];

const Wallet = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const navigateToSettings = () => {
    router.push('(other)/settings');
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <PageHeader
          icon={<FontAwesome name="angle-left" size={24} color="black" />}
          other={
            <TouchableOpacity onPress={navigateToSettings}>
              <Feather name="clipboard" size={24} color="black" />
            </TouchableOpacity>
          }
          label={<Text className='text-2xl' style={{ fontFamily: 'MonsterBold' }}>Wallet</Text>}
        />

        <View style={{ paddingTop: 30 }}>
          <TouchableOpacity style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 10 }}>
            <Text className='text-center text-2xl' style={{ fontFamily: 'MonsterMid' }}>Portfolio</Text>
          </TouchableOpacity>
          <AssetsCategories />
          <AssetWalletBalance />
          <AssetsActionButton />
        </View>
      </SafeAreaView>

      <BottomDrawer enablePanDownToClose={false} ui={
        <View>
          {/* Header with search and filter icons */}
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>My Assets</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity style={{marginRight:10}}>
                <Ionicons name="search-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="filter-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* List of assets */}
          {filteredAssets.map((item) => (
            <View key={item.id} style={styles.assetContainer}>
              <View style={styles.leftSection}>
                <View style={styles.iconPlaceholder}>
                  <Ionicons name="logo-bitcoin" size={24} color="#F7931A" />
                </View>
                <View>
                  <Text style={styles.assetName}>{item.name}</Text>
                  <Text style={styles.assetPrice}>{`$${item.price.toFixed(2)}`}</Text>
                </View>
              </View>
              <View style={styles.body}>
            <MarketChart />
            <Text style={[{ color: item.change > 0 ? 'green' : 'red' }, {fontFamily:'MonsterBold'}]}>{`${item.change > 0 ? '+' : ''}${item.change}%`}</Text>
          </View>
              <View style={styles.rightSection}>
                <Text style={styles.holdings}>{item.holdings}</Text>
                <Text style={[{ color: item.change > 0 ? 'green' : 'red' }, {fontFamily:'MonsterBold'}]}>{`$${item.value.toFixed(2)}`}</Text>
            
              </View>
            </View>
          ))}
        </View>
      } />
    </>
  )
}

export default Wallet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerTitle: {
    fontSize: 18,
 fontFamily:'MonsterBold'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    marginRight: 10,
  },
  assetName: {
    fontSize: 16,
  fontFamily:'MonsterBold'
  },
  assetPrice: {
    fontSize: 14,
    color: '#888',
    fontFamily:'MonsterReg'
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  holdings: {
    fontSize: 16,
    color: '#000',
    fontFamily:'MonsterReg'
  },
  value: {
    fontSize: 16,
    color: '#000',
    
  fontFamily:'MonsterReg'
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  text:{
    fontFamily:'MonsterBold',
    color:'green'
  }
});
