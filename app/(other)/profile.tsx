import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import ProfileScreen from '@/components/profile/Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const Profile = () => {
  const theme = useAppSelector(state => state.theme.theme)

  return (
    <SafeAreaView style={[styles.safeArea,{backgroundColor: theme ? '#0F0F0F': 'white'}]}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white': 'black'} />}
        label={<ThemedText style={styles.pageHeaderLabel}>Profile</ThemedText>}
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
