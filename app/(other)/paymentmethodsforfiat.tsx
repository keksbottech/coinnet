import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import { FontAwesome } from '@expo/vector-icons';
import Paypal from '@/assets/svg/paypal.svg';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const PaymentMethods = () => {
  const router = useRouter();
  const theme = useAppSelector(state => state.theme.theme)

  const navigateToPaypal = () => {
    router.push('/(other)/paywithpaypalforfiat');
  };

  const navigateToPaystack = () => {
    router.push('/(other)/paywithpaystackforfiat');
  };

  const navigateToFlutterwave = () => {
    router.push('/(other)/paywithflutterwaveforfiat');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />}  
        label={<ThemedText style={styles.headerLabel}>Deposit</ThemedText>} 
      />
  
      <View style={styles.wrapper}>
        <ThemedText style={styles.title}>Payment Methods</ThemedText>


        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity onPress={navigateToPaypal} style={[styles.button, {borderColor:theme ? 'white': 'black'}]}>
            <Paypal />
            <ThemedText style={styles.label}>Deposit with Paypal</ThemedText>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={navigateToFlutterwave} style={[styles.button, {borderColor:theme ? 'white': 'black'}]}>
            <View>
              <Image 
                source={require('@/assets/images/flutterwave.png')} 
                style={styles.image} 
                resizeMode="contain" 
              />
            </View>
            <ThemedText style={styles.label}>Deposit with Flutterwave</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToPaystack} style={[styles.button, {borderColor:theme ? 'white': 'black'}]}>
            <View>
              <Image 
                source={require('@/assets/images/paystack.png')} 
                style={styles.image} 
                resizeMode="contain" 
              />
            </View>
            <ThemedText style={styles.label}>Deposit with Paystack</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  wrapper: {
    marginTop: 20,
  },
  headerLabel: {
    fontFamily: 'MonsterBold',
    fontSize: 24, // Adjusted for consistency with the header text
  },
  title: {
    fontFamily: 'MonsterBold',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontFamily: 'MonsterReg',
    marginLeft: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
});
