import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('NG');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [country, setCountry] = useState(null);

  const handleSendMessage = () => {
    // Handle send message logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Contact us for Coinnet</Text>
      <View style={styles.infoContainer}>
        <Ionicons name="location-sharp" size={20} color="black" />
        <Text style={styles.infoText}>
          House# 72, Road# 21, Banani, Dhaka-1213 (near Banani Bidyaniketon School & College, beside University of Nigeria)
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="call-sharp" size={20} color="black" />
        <Text style={styles.infoText}>Call: 13301 (24/7)</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="mail-sharp" size={20} color="black" />
        <Text style={styles.infoText}>Email: support@coinnet.com</Text>
      </View>

      <Text style={{fontFamily:'MonsterBold', fontSize:18, paddingVertical:20}}>Send Message</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.phoneContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCountryNameButton={false}
          withCallingCode
          withEmoji
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCountry(country);
          }}
          containerButtonStyle={styles.countryPicker}
        />
        <Text style={styles.callingCode}>+{country?.callingCode}</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Your mobile number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write your text"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
  headerText: {
    fontSize: 21,
fontFamily:'MonsterBold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
fontFamily:'MonsterReg',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width:'100%',

fontFamily:'MonsterReg',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  countryPicker: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  callingCode: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    width:'100%'
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
fontFamily:'MonsterBold',
  },
});

export default ContactUs;
