import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import NotificationsScreen from '@/components/notification/Notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const NotificationSettings = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />} 
        label={<Text style={styles.headerLabel}>Notification settings</Text>} 
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
