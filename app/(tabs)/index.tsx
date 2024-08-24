import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import PageHeader from '@/components/page header/PageHeader';
import MarketMovers from '@/components/market movers/MarketMovers';
import Portfolio from '@/components/portfolio/Portfolio';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Chart from '@/components/trading chart/Chart';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { Wave } from 'react-native-animated-spinkit';

const Home = () => {
  const router = useRouter();
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

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
    router.push('(other)/settings');
  };



  useEffect(() => {

    fetchPrice();
  }, []);

  const navigateToProfile = () => {
    router.push('(other)/profile');
  };

  
  const fetchPrice = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('https://api.coincap.io/v2/assets');
        console.log(response.data)
        setMarketData(response.data.data);
      } catch (error) {
        console.error('Error fetching price:', error.message);
      }
      finally{
        setIsLoading(false)
      }
    
    }

    const navigateToMoreMarketData = () => {
      router.push('/(tabs)/market')
    }

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

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceTitle}>Portfolio Balance</Text>
            <Text style={styles.balanceAmount}>$2,760.23</Text>
            <Text style={styles.balanceChange}>+2.60%</Text>
          </View>

          <Chart />

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
            data={marketData}
            renderItem={({ item, index }) => {
              if(index >= 0 && index < 10){
              return <MarketMovers  volume={item.volumeUsd24Hr} priceUsd={item.priceUsd} changePercent24Hr={item.changePercent24Hr} symbol={item.symbol}/>
              }
              else {
                return null
              }
          
            }}
            showsHorizontalScrollIndicator={false}
       
          />

          <View style={styles.portfolioHeader}>
            <Text style={styles.portfolioTitle}>Portfolio</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.portfolioContainer}>
            {[0, 0, 0, 0].map((coins, index) => (
              <Portfolio key={index} />
            ))}
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
