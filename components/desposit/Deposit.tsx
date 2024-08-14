import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Mastercard from '@/assets/svg/mastercard.svg'
import Visacard from '@/assets/svg/visa.svg'
import Expresscard from '@/assets/svg/express.svg'
import Discovercard from '@/assets/svg/discover.svg'


const CardForm = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpMonth, setCardExpMonth] = useState('');
  const [cardExpYear, setCardExpYear] = useState('');
  const [cardSecurityCode, setCardSecurityCode] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Deposit Method</Text>
        <View style={styles.icons}>
          <Mastercard/>
          <Visacard/>
          <Expresscard />
          <Discovercard/>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name on card</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNameOnCard}
          value={nameOnCard}
          placeholder="John Doe"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Card number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCardNumber}
          value={cardNumber}
          placeholder="0000 0000 0000 0000"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.expirationContainer}>
        <View style={styles.expirationInput}>
          <Text style={styles.label}>Card expiration</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCardExpMonth}
            value={cardExpMonth}
            placeholder="Month"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.expirationInput}>
          <Text style={{ color: 'white' }}>.</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCardExpYear}
            value={cardExpYear}
            placeholder="Year"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Card Security Code</Text>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.input, {flex:1}]}
            onChangeText={setCardSecurityCode}
            value={cardSecurityCode}
            placeholder="Code"
            keyboardType="numeric"
          />
          <Ionicons name="information-circle-outline" size={24} style={styles.icon} />
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.changeMethod}>Change Deposit Method</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  headerText: {
    fontSize: 18,
    fontFamily:'MonsterBold',
    marginBottom: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  input: {
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    
    fontFamily:'MonsterReg',
    top:10
  },
  icon: {
    marginLeft: 10,
  },
  expirationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  expirationInput: {
    flex: 0.48,
    fontFamily:'MonsterReg'
  },
  changeMethod: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label:{
    fontFamily:'MonsterBold'
  }
});

export default CardForm;
