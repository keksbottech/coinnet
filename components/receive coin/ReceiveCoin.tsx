import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ReceiveCoin = () => {
  const walletAddress = '3K9CKsePi...Df5NfQh7iK';

  const handleCopyToClipboard = () => {
    Clipboard.setString(walletAddress);
    Alert.alert('Copied!', 'Wallet address copied to clipboard.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          value={walletAddress}
          size={150}
        />
      </View>
      <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
        <View>
      <Text style={styles.addressLabel}>Wallet address</Text>
      <Text style={styles.address}>{walletAddress}</Text>
      </View>
      <TouchableOpacity style={styles.copyButton} onPress={handleCopyToClipboard}>
        <Text style={styles.copyButtonText}>Copy</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth:.5,
    borderColor:'black',
    width:'100%',
    justifyContent:'center'
  },
  qrContainer: {
    marginBottom: 20,
    padding: 60,
    borderRadius: 10,
  },
  addressLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily:'MonsterReg'
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    fontFamily:'MonsterReg'
  },
  copyButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  copyButtonText: {
    fontSize: 17,
    color: '#007bff',
  borderWidth:.4,
  borderColor:'black',
  padding:12,
  borderRadius:10,
    fontFamily:'MonsterReg'
  },
});

export default ReceiveCoin;
