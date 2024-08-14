import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';

const ProfileScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [selectedGender, setSelectedGender] = useState("male");

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel || response.error) {
          console.log('User cancelled image picker');
        } else {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/dummy.png')} style={styles.image} />
          <TouchableOpacity onPress={selectImage} style={styles.editBtn}>
          <Feather name="camera" size={14} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Nate Samson</Text>
      <TextInput style={styles.input} placeholder="Dmutro Nweke" />
      <View style={styles.inputContainer}>
        <Text style={styles.flag}>🇳🇬 +234</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="8047686364"
          keyboardType="numeric"
        />
      </View>
      <Picker
        
        selectedValue={selectedGender}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <TextInput style={styles.input} placeholder="nate@email.com" />
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center'
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginBottom: 20,
    flexDirection:'row',
    position:'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  placeholder: {
    color: '#aaa',
  },
  label: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily:'MonsterBold'
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily:'MonsterReg',
    paddingVertical:16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical:15
  },
  flag: {
    padding: 10,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontFamily:'MonsterReg',
  },
  picker: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor:'#eee',
    paddingVertical:15
  },
  logoutButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#000',
    fontFamily:'MonsterBold',
  },
  editBtn:{
    position:'absolute',
    right:-5,
    borderRadius:50,
    backgroundColor:'#eee',
    padding:10,
    bottom:0
  }
});

export default ProfileScreen;
