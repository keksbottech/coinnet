import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from '@/components/settings/Settings';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const Settings = () => {
  const router = useRouter();
const theme = useAppSelector(state => state.theme.theme)

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: theme ? '#0F0F0F': 'white'}]}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white': 'black'} />}
        label={<ThemedText style={styles.pageHeaderLabel}>Settings</ThemedText>}
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
