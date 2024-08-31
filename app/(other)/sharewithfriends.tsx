import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import ReferralScreen from '@/components/share with friends/ShareWithFriends';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const ShareWithFriends = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.headerText}>Share with friends</Text>}
      />
      <View style={styles.container}>
        <ReferralScreen />
      </View>
    </SafeAreaView>
  );
};

export default ShareWithFriends;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
