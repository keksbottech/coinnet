import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from '@/components/settings/Settings';
import { useRouter } from 'expo-router';

const Settings = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.pageHeaderLabel}>Settings</Text>}
      />
      <View style={styles.container}>
        <SettingsScreen />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10
  },
  container: {
    paddingTop: 30,
    flex: 1
  },
  pageHeaderLabel: {
    fontFamily: 'MonsterBold',
    fontSize: 24
  }
});
