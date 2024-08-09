import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import PageHeader from '@/components/page header/PageHeader'

const ShareWithFriends = () => {
  return (
    <View>
      <PageHeader label='Share with friends'/>

      <Text>Refer and Earn 2% Commission</Text>

      <Text>
      Refer friends to Connet app and get rewarded! share your unique referral link or code and earn 2% offer on your next Transaction for each successful referral
      </Text>

      <View>
        <Text>Your Referal Link</Text>
        <View>
            <Text>referal link</Text>
            <TouchableOpacity>
                <Text>Copy Code</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ShareWithFriends

const styles = StyleSheet.create({})