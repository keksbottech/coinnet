import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Define the types for the props
interface CryptoCardProps {
  symbol: string;
  priceUsd: string;
  volume: string;
  changePercent24Hr: string;
  width?: StyleProp<ViewStyle>;
  image: string;
}

const screenWidth = Dimensions.get("window").width;

const CryptoCard: React.FC<CryptoCardProps> = ({ symbol, priceUsd, volume, changePercent24Hr, width, image }) => {
  // Determine color based on changePercent24Hr
  const changeColor = parseFloat(changePercent24Hr) >= 0 ? '#4CAF50' : '#FF5252'; // Green for positive, red for negative

  return (
    <View style={[styles.card, width]}>
      <View style={styles.header}>
        <Text style={styles.title}>{`${symbol}/USD`}</Text>
        <View>
          <Image
            source={{ uri: `https://cryptocompare.com${image}` }}
            style={{ width: 50, height: 50 }}
          />
        </View>
      </View>
      <Text style={styles.price}>{priceUsd}</Text>
      <Text style={[styles.change, { color: changeColor }]}>
        {parseFloat(changePercent24Hr).toFixed(2)}%
      </Text>
      <LineChart
        data={{
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: () => '#FFD700', // Gold color for the line
              strokeWidth: 1,
            },
          ],
        }}
        width={screenWidth * 0.40} // Width of the chart relative to screen width
        height={60} // Height of the chart
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: () => '#FFD700', // Gold color for the line
          strokeWidth: 2,
        }}
        bezier
        style={styles.chart}
      />
      <Text style={styles.volume}>24H Vol.</Text>
      <Text style={styles.volume}>{volume}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: screenWidth * 0.46,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginVertical: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'MonsterBold',
    color: '#4A4A4A',
  },
  price: {
    fontSize: 23,
    fontFamily: 'MonsterBold',
    color: '#000',
    marginVertical: 0,
  },
  change: {
    marginBottom: 5,
    marginTop: 6,
    fontFamily: 'MonsterReg',
  },
  chart: {
    marginVertical: 5,
  },
  volume: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 5,
    fontFamily: 'MonsterBold',
  },
});

export default CryptoCard;
