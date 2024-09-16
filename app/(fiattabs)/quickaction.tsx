import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Expo vector icons
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import SupportActionButtons from '@/components/support action buttons/SupportActionButtons';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';

const QuickActionPage = () => {
  const router = useRouter()
  const theme = useAppSelector(state => state.theme.theme)

  const navigateToTopup = () => {
    router.push('/(other)/paymentmethodsforfiat')
  }
  
  const navigateToTransferFiat = () => {
    console.log('clicked')
    router.push('/(other)/transferinput')
  }

  const navigateToExchange = () =>{
    router.push('/(other)/exchangefiatcurrency')
  }

  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
<SupportActionButtons/>
      {/* Top-Up Option */}
      <TouchableOpacity onPress={navigateToTopup} style={styles.option}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="account-balance-wallet" size={24} color="orangered" />
        </View>
        <Text style={styles.optionText}>Top-Up</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#8F8F8F" />
      </TouchableOpacity>

      {/* Send Option */}
      <TouchableOpacity onPress={navigateToTransferFiat} style={styles.option}>
        <View style={styles.iconContainer}>
          <Ionicons name="send-outline" size={24} color="orangered" />
        </View>
        <Text style={styles.optionText}>Send</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#8F8F8F" />
      </TouchableOpacity>

      {/* Exchange Option */}
      <TouchableOpacity onPress={navigateToExchange} style={styles.option}>
        <View style={styles.iconContainer}>
          <Ionicons name="swap-horizontal-outline" size={24} color="orangered" />
        </View>
        <Text style={styles.optionText}>Exchange</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="#8F8F8F" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 20,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    fontFamily:'MonsterReg'
  },
});

export default QuickActionPage;
