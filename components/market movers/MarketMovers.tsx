import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MarketMovers = () => {
  return (
 
<View>
<View>
    <Text>Market Movers</Text>
    <TouchableOpacity>
        <Text>More</Text>
    </TouchableOpacity>
    </View>

    <View>
        <View>
            <Text>BTC/USD</Text>
            <Text>30,114.80</Text>
            <Text>+2.76%</Text>
        </View>
        <Image/>
    </View>
<View>
    
</View>
    <View>
        <Text>24H Vol.</Text>
        <Text>394 897 432,26</Text>
    </View>
</View>
  )
}

export default MarketMovers

const styles = StyleSheet.create({})