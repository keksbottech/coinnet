import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';

interface DisplayPhoneNumberProps {
  receiverName: string | null;
  receiverPhone: any;
  handleCancel: () => void
}

const DisplayPhoneNumber: React.FC<DisplayPhoneNumberProps> = ({ receiverName, handleCancel, receiverPhone  }) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false); // Ensure this is a boolean

  const handleCopy = async () => {
    try{
    await Clipboard.setStringAsync(receiverPhone);
    setModalVisible(true);
    }
    catch(err){
      console.log(err)
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.receiverName}>{receiverName}</Text>
      <Text style={styles.receiverPhone}>{receiverPhone}</Text>

      <TouchableOpacity onPress={handleCopy} style={styles.button}>
        <FontAwesome name="clipboard" size={24} color="blue" />
        <Text style={styles.buttonText}>Copy Phone Number</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleCancel} style={styles.button}>
        <FontAwesome name="close" size={24} color="blue" />
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FontAwesome name="clipboard" size={48} color="blue" style={styles.icon} />
            <Text style={styles.modalText}>Phone number copied to clipboard!</Text>
            <Text style={styles.modalPhone}>{receiverPhone}</Text>
            <TouchableOpacity onPress={handleCloseModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems:'center'
  },
  receiverName: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily:'MonsterReg'
  },
  receiverPhone: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily:'MonsterReg'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical:3
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily:'MonsterReg'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  icon: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalPhone: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DisplayPhoneNumber;
