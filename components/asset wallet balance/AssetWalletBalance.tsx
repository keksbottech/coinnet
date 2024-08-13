import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as SVGText } from 'react-native-svg';

const AssetWalletBalance = () => {
  // Data for the segments of the pie chart
  const data = [
    { key: 1, value: 30, svg: { fill: '#FFC107' } }, // Yellow
    { key: 2, value: 20, svg: { fill: '#00BCD4' } }, // Cyan
    { key: 3, value: 25, svg: { fill: '#8BC34A' } }, // Green
    { key: 4, value: 15, svg: { fill: '#FF4081' } }, // Pink
    { key: 5, value: 10, svg: { fill: '#7E57C2' } }, // Purple
  ];

  // Custom labels in the center of the pie chart
  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <SVGText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={24}
        >
          {data.amount}
        </SVGText>
      );
    });
  };

  return (
    <View style={styles.container}>
      <PieChart
        style={styles.pieChart}
        data={data}
        innerRadius={70} // Adjust to create a donut chart
        outerRadius={'100%'}
      >
        <G>
          <SVGText
            x="0%"
            y="-10%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={18}
            fill="#3E4C59"
          >
            My Balance
          </SVGText>
          <SVGText
            x="0%"
            y="5%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={24}
            fill="#3E4C59"
          >
            $2,760.23
          </SVGText>
          <SVGText
            x="0%"
            y="17%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={16}
            fill="#2ECC71"
          >
            +2.60%
          </SVGText>
        </G>
      </PieChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
  },
  pieChart: {
    height: 200, // Adjust the size as needed
    width: 200,
  },
});

export default AssetWalletBalance;
