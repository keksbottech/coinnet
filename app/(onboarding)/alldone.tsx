import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';

const AllDoneAccountCreation = () => {
  return (
    <View>
        <View>
        <Feather name="check" size={24} color="black" />
        </View>

<View>
<Text>All done</Text>
<Text>Congrulations! Your account has been successfully added</Text>
</View>

<Button label='Done'/>
    </View>
  )
}

export default AllDoneAccountCreation

const styles = StyleSheet.create({})