import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import ReferralScreen from '@/components/share with friends/ShareWithFriends';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const ShareWithFriends = () => {
  const theme = useAppSelector(state =>state.theme.theme)
  return (
    <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white':"black"} />}
        label={<ThemedText style={styles.headerText}>Share with friends</ThemedText>}
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
