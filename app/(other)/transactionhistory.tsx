import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'
import TransactionHistory from '@/components/transaction history/TransactionHistory'

const TransactionHistoryPage = () => {
  return (
    <View>
        <PageHeader label='Transaction History'/>


    <TransactionHistory/>
    </View>
  )
}

export default TransactionHistoryPage

const styles = StyleSheet.create({})