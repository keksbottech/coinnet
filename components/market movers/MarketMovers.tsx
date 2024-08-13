import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BitcoinImage from '@/assets/svg/bitcoin.svg'

const screenWidth = Dimensions.get("window").width;

const CryptoCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>BTC/USD</Text>
        <View>
        <BitcoinImage/>
        </View>
      </View>
      <Text style={styles.price}>30,113.80</Text>
      <Text style={styles.change}>+2.76%</Text>
      <LineChart
        data={{
          datasets: [
            {
              data: [29000, 29500, 29200, 29800, 30100, 30000, 30113],
              color: () => `#FFD700`, // Gold color for the line
              strokeWidth: 1,
            }
          ]
        }}
        width={screenWidth * 0.40} // Width of the chart relative to screen width
        height={60} // Height of the chart
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          color: () => `#FFD700`, // Gold color for the line
          strokeWidth: 2,
        }}
        bezier
        style={styles.chart}
      />
      <Text style={styles.volume}>24H Vol.</Text>
      <Text  style={styles.volume}>394 897 432,26</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: screenWidth * 0.45,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginVertical: 10,
    marginRight:10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:10
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  icon: {
    width: 24,
    height: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 0,
  },
  change: {
    color: '#4CAF50', // Green color for positive change
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop:6
  },
  chart: {
    marginVertical: 5,
  },
  volume: {
    fontSize: 12,
    color: '#A9A9A9',
    marginTop: 5,
  },
});

export default CryptoCard;
