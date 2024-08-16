import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import ApplePay from '@/assets/svg/applepay.svg'
import PayPal from '@/assets/svg/paypal.svg'
import MonoBank from '@/assets/svg/mastercard.svg'
import VisaCard from '@/assets/svg/visa.svg'

const paymentMethods = [
    { id: 1, name: 'Coinnet Wallet', icon: 
      <ApplePay/>, number: 'XXXX5555' },
    { id: 2, name: 'PayPal', icon: <PayPal/>, number: 'XXXX5555' },
    { id: 3, name: 'Monobank', icon: <MonoBank/>, number: 'XXXX5555' },
    { id: 4, name: 'Debit card', icon: <VisaCard/>, number: 'XXXX5555' },
  ];

  

const PaymentBottomDrawer = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
  
  
  return (
<BottomDrawer
    ui={
      <View style={styles.container}>
      <Text style={styles.title}>Choose Payment Methods</Text>
      {paymentMethods.map(method => (
        <TouchableOpacity
          key={method.id}
          style={styles.methodContainer}
          onPress={() => setSelectedMethod(method.id)}
        >
          <View style={styles.methodDetails}>
            <View>
            {method.icon}
            </View>
            <View style={{marginLeft:10}}>
              <Text style={styles.methodName}>{method.name}</Text>
              <Text style={styles.methodNumber}>{method.number}</Text>
            </View>
          </View>
          {selectedMethod === method.id && (
            <MaterialIcons name="check-circle" size={24} color="green" />
          )}
        </TouchableOpacity>
      ))}
    </View>
    }
    />
  )
}

export default PaymentBottomDrawer



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      paddingTop: 20,
      paddingHorizontal:20
    },
    title: {
      fontSize: 18,
      fontFamily:'MonsterBold',
      marginBottom: 20,
    },
    methodContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 20,
    },
    methodDetails: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 15,
    },
    methodName: {
      fontSize: 16,
   fontFamily:'MonsterBold'
    },
    methodNumber: {
      fontSize: 14,
      color: '#888',
      fontFamily:'MonsterReg'
    },
  });