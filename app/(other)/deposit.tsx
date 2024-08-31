import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Input from '@/components/ui/input/Input';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '@/components/ui/button/Button';
import CardForm from '@/components/desposit/Deposit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Deposit = () => {
  const router = useRouter();

  const webview = () => router.push('/(other)/webview');

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />} 
        label={<Text style={styles.headerLabel}>Deposit</Text>} 
      />
      <View style={styles.container}>
        <CardForm />
        <Button onClick={webview} styles={styles.button} label='Confirm' />
      </View>
    </SafeAreaView>
  );
};

export default Deposit;

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
    paddingTop: 50,
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
});
