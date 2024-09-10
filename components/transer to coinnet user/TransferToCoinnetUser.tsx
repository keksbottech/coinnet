import React from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useAppSelector } from '@/hooks/useAppSelector';

const TransferToCoinnetUser = () => {
  const theme = useAppSelector(state => state.theme.theme)

  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>User ID</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="at" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder=""
          autoCapitalize="none"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Chisom Nweke Mary"
          color="#c2d0a2"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default TransferToCoinnetUser;
