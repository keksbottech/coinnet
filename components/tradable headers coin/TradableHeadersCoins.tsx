import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tradableCoinsData from '@/app json/tradableheadercoins.json'
import Select from '../select/Select'
const TradableHeadersCoins = () => {
  return (
    <View>
     <FlatList
     horizontal
        data={tradableCoinsData}
        keyExtractor={data => String(data.id)}
        renderItem={({items}) => <View>
            <Text>{items.name}</Text>
            {items.icon === 'drop' ? <Select/> : ''}
            </View>
            }
       />
    
    <View>
        <Select/>
        <Select/>
    </View>
    </View>
  )
}

export default TradableHeadersCoins

const styles = StyleSheet.create({})