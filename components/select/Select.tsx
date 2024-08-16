import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type SelectTypes = {
  data?: [];
  styles?: {}
}

const Select = ({data,styles}: SelectTypes) => {


  const [selectedValue, setSelectedValue] = useState('java');

  return (
    <View style={[style.container,styles]} >
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue: React.SetStateAction<string>) => setSelectedValue(itemValue)}
      >
        {
          data?.map(el => <Picker.Item key={el.id} label={` ${el.dial_code}`} value={el.dial_code}/> )
        }
  
      </Picker>
    </View>
  );
};

export default Select;

const style = StyleSheet.create({
  container:{
    padding:0,
    borderBlockColor:'black',
    borderWidth:.5,
    width:'30%'
  }
})