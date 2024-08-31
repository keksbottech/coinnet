import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit';

// Define the type for the props
interface MarketChartProps {
    data?: any[]; // Adjust type based on actual data structure
    withHorizontalLabels?: boolean;
    withVerticalLabels?: boolean;
    styles?: ViewStyle; // Correct type for styles prop
}

const MarketChart: React.FC<MarketChartProps> = ({ data = [], withHorizontalLabels = false, withVerticalLabels = false, styles }) => {

  return (
        <View style={styles}>
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
                                Math.random() * 100
                            ],
                            strokeWidth: 1,
                            color: () => `#FFD700`,
                        },
                    ],
                }}
                width={Dimensions.get('window').width * 0.45} // from react-native
                height={60} // Height of the chart
                withVerticalLabels={withVerticalLabels}
                withHorizontalLabels={withHorizontalLabels}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: () => `#FFD700`, // Gold color for the line
                    strokeWidth: 2,
                    propsForDots: {
                        r: '5',
                        strokeWidth: '2',
                        stroke: '#fafafa',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default MarketChart;

const styles = StyleSheet.create({});
