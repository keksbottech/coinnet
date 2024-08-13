import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ActionButton = ({ iconName, label }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <View style={styles.iconBackground}>
        <Ionicons name={iconName} size={24} color="white" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const AssetsActionButton = () => {
  return (
    <View style={styles.container}>
      <ActionButton iconName="add-outline" label="Deposit" />
      <ActionButton iconName="arrow-up-outline" label="Send" />
      <ActionButton iconName="arrow-down-outline" label="Receive" />
      <ActionButton iconName="cash-outline" label="Withdraw" />
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
