import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LimitsAndFeatures from '@/components/limits and features/LimitsAndFeatures';
import { SafeAreaView } from 'react-native-safe-area-context';

const LimitsAndFeaturesPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />} 
        label={<Text style={styles.headerLabel}>Limits and Features</Text>} 
      />
      <View style={styles.container}>
        <LimitsAndFeatures />
      </View>
    </SafeAreaView>
  );
};

export default LimitsAndFeaturesPage;

const styles = StyleSheet.create({
  safeArea: {
    padding: 10,
    flex: 1,
  },
  headerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    paddingTop: 30,
  },
});
