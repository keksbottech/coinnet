import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import TransactionComplete from '@/components/transaction complete/TransactionComplete'

const TransactionCompletePage = () => {
  return (
    <View>
        <PageHeader label='Transaction Completed'/>
   <TransactionComplete/>
    </View>
  )
}

export default TransactionCompletePage

const styles = StyleSheet.create({})