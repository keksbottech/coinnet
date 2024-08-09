import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/ui/button/Button'

const BvnFaceVerification = () => {
  return (
    <View>
      <View>
        <Image/>
      </View>

      <View>
        <Text>One More Thing</Text>
        <Text>To complete your KYC verification, please ensure that your face is clearly visible and matches the photo on your NIN and BVN. Make sure you are in a well-lit environment with a plain background. Remove any facial accessories such as glasses or hats before taking the photo.</Text>
      </View>

      <Button label='Continue'/>
    </View>
  )
}

export default BvnFaceVerification

const styles = StyleSheet.create({})