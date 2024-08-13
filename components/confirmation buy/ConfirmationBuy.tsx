import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Separator } from 'tamagui';
import Button from '../ui/button/Button';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ConfirmationBuy() {
  const [selectedMethod, setSelectedMethod] = useState('Coinnet Wallet');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Buy</Text>
      <Text style={styles.amount}>0.040510</Text>

      <Text style={styles.label} className='font-bold'>You Receive</Text>

      <View style={styles.sectionB}>
     
        <View style={styles.row}>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.amountReceived}>0.040141 </Text>
        </View>

        <Text className='font-bold text-xl'>BTC</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label} className='font-bold'>Payment Methods Available</Text>
        <View style={styles.pickerContainer}>
        <FontAwesome name="bank" size={24} color="black" />
        <View style={{width:'100%'}}>
          <Picker
            selectedValue={selectedMethod}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMethod(itemValue)}
          >
            
            <Picker.Item label="Coinnet Wallet" value="Coinnet Wallet" />
            <Picker.Item label="Another Method" value="Another Method" />
          </Picker>
          <Text style={{marginLeft:18}}>XXXXXXX887748</Text>
        </View>
        </View>
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
      <Button label='Buy'/>
    </View>
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
    fontWeight:'bold'
  },
  amount: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
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
    fontSize: 18,
    marginBottom: 5,
  },
  row: {
    
  },
  quantity: {
    fontSize: 14,
    color: '#888',
  },
  amountReceived: {
    fontSize: 16,
    marginTop: 5,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection:'row',
    alignItems:'center',
    padding:15
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
  },
  detailValue: {
    fontSize: 14,
  },
});
