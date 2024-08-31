import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Separator } from 'tamagui';
import Button from '../ui/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ConfirmationBuy({enableBottomDrawerFunc}:any) {
  const [selectedMethod, setSelectedMethod] = useState('Coinnet Wallet');

  const router = useRouter()


  const navigateToAuthenticationCode = () => {
    router.push('/(trade)/transactionauthenticationcode')
  }


  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Your Buy</Text>
      <Text style={styles.amount}>0.040510</Text>

      <Text style={styles.label} >You Receive</Text>

      <View style={styles.sectionB}>
     
        <View style={styles.row}>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.amountReceived}>0.040141 </Text>
        </View>

        <Text  style={{fontFamily:'MonsterBold', fontSize:18}}>BTC</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label} >Payment Methods Available</Text>
        <TouchableOpacity onPress={enableBottomDrawerFunc} style={styles.pickerContainer}>
          <View style={styles.wrap}>
        <FontAwesome name="bank" size={24} color="black" />
        <View>
          <Text style={styles.text}>Coinnet Wallet</Text>
          <Text style={[styles.text, {marginTop:5}]}>XXXXXXX887748</Text>
        </View>
        </View>

        <AntDesign name="downcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>0.040141 BTC $1000</Text>
        </View>
        <Separator/>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Transaction Fee (0.05%)</Text>
          <Text style={styles.detailValue}>$1.0</Text>
        </View>
        <Separator/>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total</Text>
          <Text style={styles.detailValue}>0.040141 BTC $1001</Text>
        </View>
      </View>
      <Button onClick={navigateToAuthenticationCode} styles={{top:100, position:'relative'}} label='Buy'/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:'MonsterBold'
  },
  amount: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    
    fontFamily:'MonsterBold'
  },
  section: {
    marginBottom: 20,
  },
  sectionB:{
  flexDirection:'row',
  justifyContent:'space-between',
   paddingVertical:20
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    
    fontFamily:'MonsterBold'
  },
  row: {
    
  },
  quantity: {
    fontSize: 14,
    color: '#888',
    
    fontFamily:'MonsterReg'
  },
  amountReceived: {
    fontSize: 16,
    marginTop: 5,
    
    fontFamily:'MonsterBold'
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    // flexDirection:'row',
    // alignItems:'center',
    padding:15,
    justifyContent:'space-between',
    flexDirection:'row'
  },
  picker: {

    width: '90%',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  detailLabel: {
    fontSize: 16,
    color: '#888',
    
    fontFamily:'MonsterReg'
  },
  detailValue: {
    fontSize: 14,
    
    fontFamily:'MonsterReg'
  },
  text:{
    fontFamily:'MonsterReg',
    marginLeft:18
  },
  wrap:{
    flexDirection:'row',
    alignItems:'center'
  }
});
