import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import LimitsAndFeatures from '@/components/limits and features/LimitsAndFeatures';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const LimitsAndFeaturesPage = () => {
  const theme = useAppSelector(state => state.theme.theme)

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white': "black" }/>} 
        label={<ThemedText style={styles.headerLabel}>Limits and Features</ThemedText>} 
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
