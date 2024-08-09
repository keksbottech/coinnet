import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import marketHeaderData from '@/app json/marketheadersearch.json'

const MarketHeaderTabs = () => {
  return (
    <View>
      <FlatList
        data={marketHeaderData}
        keyExtractor={data=> String(data.id)}
        renderItem={({items}) => <TouchableOpacity>
            <Text>{items.name}</Text>
        </TouchableOpacity>}
      />
    </View>
  )
}

export default MarketHeaderTabs

const styles = StyleSheet.create({})