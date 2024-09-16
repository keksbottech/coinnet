import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '../ThemedText';

const ReceiveMoneyFromCoinnet = () => {
  const userData = useAppSelector(state => state.user.user)
  const theme = useAppSelector(state => state.theme.theme)

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userData._id);
    Alert.alert("Copied to Clipboard", "Wallet ID copied successfully!");
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.headerText}>Use Your Coinnet Account to Receive Payment</ThemedText>

      <View style={styles.card}>
        <View style={styles.row}>
          <ThemedText style={styles.title}>Coinnet</ThemedText>
          <TouchableOpacity onPress={copyToClipboard}>
            <ThemedText style={styles.copyText}>Copy</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBlock}>
          <ThemedText style={styles.label}>Recipient Bank</ThemedText>
          <ThemedText style={styles.infoText}>Coinnet</ThemedText>
        </View>

        <View style={styles.infoBlock}>
          <ThemedText style={styles.label}>Wallet Name</ThemedText>
          <ThemedText style={styles.infoText}>{`${userData.firstName} ${userData.lastName}`}</ThemedText>
        </View>

        <View style={styles.infoBlock}>
          <ThemedText style={styles.label}>Wallet ID</ThemedText>
          <View style={styles.row}>
            <ThemedText style={styles.walletID}>{userData._id}</ThemedText>
            <TouchableOpacity onPress={copyToClipboard} style={styles.iconButton}>
              <ThemedText style={styles.copyText}>📋</ThemedText>
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
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
    fontFamily:'MonsterBold'
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
  fontFamily:'MonsterBold',
    color: '#000',
  },
  copyText: {
    fontSize: 16,
    color: '#000',
    fontFamily:'MonsterReg'
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
    fontFamily:'MonsterBold'
  },
  infoText: {
    fontSize: 18,
    fontFamily:'MonsterReg',
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
