import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ActioButtonTypes = {
  iconName: string,
  label:string,
  onClick: ()=> void
}
const ActionButton = ({ iconName, label, onClick }:ActioButtonTypes) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.buttonContainer}>
      <View style={styles.iconBackground}>
        <Ionicons name={iconName} size={24} color="white" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const AssetsActionButton = () => {
    const router = useRouter()

    const navigateToWithdraw = () => {
        router.push('/(trade)/withdraw')
    }
    const navigateToReceiveCoin = () => {
        router.push('/(other)/receivecoin')
    }
    const navigateToSendCoin = () => {
        router.push('/(other)/sendcoin')
    }
    const navigateToDepositCoin = () => {
        router.push('/(other)/paymentmethods')
    }
  return (
    <View style={styles.container}>
      <ActionButton iconName="add-outline" onClick={navigateToDepositCoin} label="Deposit" />
      <ActionButton iconName="arrow-up-outline" onClick={navigateToSendCoin} label="Send" />
      <ActionButton iconName="arrow-down-outline" onClick={navigateToReceiveCoin} label="Receive" />
      <ActionButton iconName="cash-outline" onClick={navigateToWithdraw} label="Withdraw" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'orangered',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    color: '#4C4C4C',
    fontFamily:'MonsterMid'
  },
});

export default AssetsActionButton;
