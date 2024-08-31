import { useAppSelector } from '@/hooks/useAppSelector';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ReceiveCoin = () => {
  const userData = useAppSelector(state => state.user.user)
  const walletAddress = '3K9CKsePi...Df5NfQh7iK';

  
  const formatWalletAddress = (address:any) => {
    if (!address || address.length <= 10) return address; // Handle short addresses
    const start = address.slice(0, 6); // Take the first 6 characters
    const end = address.slice(-6); // Take the last 6 characters
    return `${start}...${end}`; // Return the formatted address
  };

  
  const handleCopyToClipboard = async () => {
    Clipboard.setString(userData._id);
    Alert.alert('Copied!', 'Wallet address copied to clipboard.');
  };

  return (
    <View style={styles.container}>
            <Text style={[styles.addressLabel, {textAlign:'center'}]}>You can only accept payments through coinnet users</Text>
      <View style={styles.qrContainer}>
        <QRCode
          value={walletAddress}
          size={150}
        />
      </View>

      <View style={{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
      
        <View>
      <Text style={styles.addressLabel}>Wallet address</Text>
      <Text style={styles.address}>{formatWalletAddress(userData._id)}</Text>
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
