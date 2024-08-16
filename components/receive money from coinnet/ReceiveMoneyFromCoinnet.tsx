import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const ReceiveMoneyFromCoinnet = () => {
  const walletID = "1100326447";

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(walletID);
    Alert.alert("Copied to Clipboard", "Wallet ID copied successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Use Your Coinnet Account to Receive Payment</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>Coinnet</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Recipient Bank</Text>
          <Text style={styles.infoText}>Coinnet</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Wallet Name</Text>
          <Text style={styles.infoText}>Divine Ikemma</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Wallet ID</Text>
          <View style={styles.row}>
            <Text style={styles.walletID}>{walletID}</Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
              <Text style={styles.copyText}>📋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  card: {
    borderWidth: 2,
    borderColor: '#FFFF00',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFFF00',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  copyText: {
    fontSize: 16,
    color: '#000',
  },
  infoBlock: {
    marginBottom: 15,
    backgroundColor: '#E6FF57',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  walletID: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconButton: {
    marginLeft: 10,
  },
});

export default ReceiveMoneyFromCoinnet;
