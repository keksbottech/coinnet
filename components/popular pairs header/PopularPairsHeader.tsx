import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import popularPairsHeaderData from '@/app json/popularpairsheader.json'

const PopularPairsHeader = () => {
  return (
    <View>
      <FlatList
    data={popularPairsHeaderData}
    keyExtractor={data => String(data.id)}
    renderItem={({items}) => <TouchableOpacity>
        <Text>{items.name}</Text>
    </TouchableOpacity>}
      />
    </View>
  )
}

export default PopularPairsHeader

const styles = StyleSheet.create({})