import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Text as SVGText, Path, Circle } from 'react-native-svg';
import axiosBase from 'axios';
import { axios } from '@/lib/axios';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getWalletTotalBalance } from '@/lib/store/reducers/storeWalletBalances';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AssetWalletBalance = () => {
  const [balanceSum, setBalanceSum] = useState(null);
  const userData = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const walletBalance = useAppSelector(state => state.wallet.walletTotalBalance);
  const marketStoredData = useAppSelector(state => state.market.marketData)
  const [ngnRate, setNgnRate] = useState(0)


  useFocusEffect(
    useCallback(() => {
      getTotalWalletBalance();
      return () => {
        console.log('Screen is unfocused, cleaning up...');
      };
    }, [])
  );

  const getTotalWalletBalance = async () => {
    try {
      const btcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BTC');
      const ethData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'ETH');
      const usdcData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'USDC');
      const bnbData = marketStoredData.find((coin: { CoinInfo: { Name: string; }; }) => coin.CoinInfo.Name === 'BNB');

      const body = {
        btcDollarRate: parseFloat(btcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        ethDollarRate: parseFloat(ethData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        usdcDollarRate: parseFloat(usdcData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        bnbDollarRate: parseFloat(bnbData?.DISPLAY?.USD?.PRICE.replace(/[$,]/g, '')),
        userId:userData?._id
      }


      console.log('body', body)

      const [response, ngnRate] = await Promise.all([
        axios.post('wallets/totalbalance', body),
        axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
      ])

      setNgnRate(ngnRate.data.usd.ngn)

      dispatch(getWalletTotalBalance(response.data.message))

    } catch (err:any) {
      console.log(err.response.data);
    }
  };

  const data = [
    { key: 1, value: 30, fill: '#FFC107' }, // Yellow
    { key: 2, value: 20, fill: '#00BCD4' }, // Cyan
    { key: 3, value: 25, fill: '#8BC34A' }, // Green
    { key: 4, value: 15, fill: '#FF4081' }, // Pink
    { key: 5, value: 10, fill: '#7E57C2' }, // Purple
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 100;
  const centerX = 100;
  const centerY = 100;
  let cumulativeAngle = 0;

  const getPathData = (value: number) => {
    const angle = (value / total) * 2 * Math.PI;
    const startAngle = cumulativeAngle;
    const endAngle = startAngle + angle;
    cumulativeAngle += angle;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    return `M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
  };

  return (
    <View style={styles.container}>
      <Svg width={200} height={200}>
        <G>
          {data.map((slice, index) => (
            <Path
              key={index}
              d={getPathData(slice.value)}
              fill={slice.fill}
            />
          ))}

          {/* White Circle in the Center */}
          <Circle cx={centerX} cy={centerY} r={radius * 0.6} fill="white" />

          {/* Text Labels */}
          <SVGText
            x="50%"
            y="40%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={18}
            fill="#3E4C59"
          >
            My Balance
          </SVGText>
          <SVGText
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={24}
            fill="#3E4C59"
          >
            {`$${parseFloat(walletBalance).toFixed(2)}`}
            
          </SVGText>
          <SVGText
            x="50%"
            y="60%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={16}
            fill="#2ECC71"
            fontFamily='MonsterBold'
          >
     {`≈ ₦${parseFloat(+walletBalance * ngnRate).toFixed()}`}
          </SVGText>
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default AssetWalletBalance;
