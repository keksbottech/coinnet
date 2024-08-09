import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Portfolio = () => {
  return (
    <View>
    <Text>Portfolio</Text>
    <View>
        <View>
            <Image/>
            <View>
                <Text>Bitcoin</Text>
                <Text>BTC</Text>
            </View>
        </View>

        <View>
            <Text>$1,270.10</Text>
            <Text>+2.76%</Text>
        </View>
    </View>
  </View>
  )
}

export default Portfolio

const styles = StyleSheet.create({})