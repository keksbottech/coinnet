import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import ProfileScreen from '@/components/profile/Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.pageHeaderLabel}>Profile</Text>}
      />
      <View style={styles.container}>
        <ProfileScreen />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    paddingTop: 30,
    padding: 10,
    flex: 1
  },
  pageHeaderLabel: {
    fontFamily: 'MonsterBold',
    fontSize: 24
  }
});
