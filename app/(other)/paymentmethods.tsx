import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import { FontAwesome } from '@expo/vector-icons';
import Paypal from '@/assets/svg/paypal.svg';
import { useRouter } from 'expo-router';

const PaymentMethods = () => {
  const router = useRouter();

  const navigateToPaypal = () => {
    router.push('/(other)/paywithpaypal');
  };

  const navigateToPaystack = () => {
    router.push('/(other)/paywithpaystack');
  };

  const navigateToFlutterwave = () => {
    router.push('/(other)/paywithflutterwave');
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />}  
        label={<Text style={styles.headerLabel}>Deposit</Text>} 
      />
  
      <View style={styles.wrapper}>
        <Text style={styles.title}>Payment Methods</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={navigateToPaypal} style={styles.button}>
            <Paypal />
            <Text style={styles.label}>Deposit with Paypal</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToFlutterwave} style={styles.button}>
            <View>
              <Image 
                source={require('@/assets/images/flutterwave.png')} 
                style={styles.image} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.label}>Deposit with Flutterwave</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToPaystack} style={styles.button}>
            <View>
              <Image 
                source={require('@/assets/images/paystack.png')} 
                style={styles.image} 
                resizeMode="contain" 
              />
            </View>
            <Text style={styles.label}>Deposit with Paystack</Text>
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
