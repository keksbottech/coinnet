import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { useAppSelector } from '@/hooks/useAppSelector';


const Chart = ({data = [], withHorizontalLabels = true, withVerticalLabels = false, styles}) => {
  const theme = useAppSelector(state => state.theme.theme)
  return (
   <View style={styles}>
  <LineChart
    data={{
      labels: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width - 10} // from react-native
    height={220}
    yAxisLabel="$"
    // yAxisSuffix="k"
    withVerticalLabels={withHorizontalLabels} // Removes vertical axis labels
   withHorizontalLabels={withVerticalLabels} // Removes horizontal axis labels
    withOuterLines={false}
    withInnerLines={false}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: `${theme ? 'rgba(255,255, 255, .1)' : "red"}`,
      backgroundGradientFrom:`${theme ? 'gray' : "white"}`,
      backgroundGradientTo: `${theme ? 'gray' : "white"}`,
      decimalPlaces: 2, // optional, defaults to 2dp
      
      color: (opacity = 1) => `rgba(18, 85, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "5",
        strokeWidth: "2",
        stroke: "#fafafa"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
  )
}

export default Chart

const styles = StyleSheet.create({})