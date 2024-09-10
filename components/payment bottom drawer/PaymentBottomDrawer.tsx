import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import ApplePay from '@/assets/svg/applepay.svg'
import PayPal from '@/assets/svg/paypal.svg'
import MonoBank from '@/assets/svg/mastercard.svg'
import VisaCard from '@/assets/svg/visa.svg'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getPaymentMethod } from '@/lib/store/reducers/storePaymentUrl';
import { ThemedText } from '../ThemedText';

const paymentMethods = [
    { id: 1, name: 'PayPal', icon: <PayPal/>, number: 'XXXX5555' },
    { id: 2, name: 'Bank Transfer', icon: <MonoBank/>, number: 'XXXX5555' },
  ];

  

const PaymentBottomDrawer = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const dispatch = useAppDispatch()

  
    const enableSelection = (method:any, id:any) => {
      setSelectedMethod(id)
      dispatch(getPaymentMethod(method))
    }
  return (

<BottomDrawer

    ui={
      <View style={styles.container}>
      <ThemedText style={styles.title}>Choose Payment Methods</ThemedText>
      {paymentMethods.map(method => (
        <TouchableOpacity
          key={method.id}
          style={styles.methodContainer}
          onPress={() => enableSelection(method, method.id)}
        >
          <View style={styles.methodDetails}>
            <View>
            {method.icon}
            </View>
            <View style={{marginLeft:10}}>
              <ThemedText style={styles.methodName}>{method.name}</ThemedText>
              <ThemedText style={styles.methodNumber}>{method.number}</ThemedText>
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