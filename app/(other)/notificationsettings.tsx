import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import NotificationsScreen from '@/components/notification/Notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const NotificationSettings = () => {
  const theme = useAppSelector(state => state.theme.theme)
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white' : "black"} />} 
        label={<ThemedText style={styles.headerLabel}>Notification settings</ThemedText>} 
      />
      <View style={styles.container}>
        <NotificationsScreen />
      </View>
    </SafeAreaView>
  );
};

export default NotificationSettings;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  headerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    paddingTop: 40,
    flex:1
  },
});
