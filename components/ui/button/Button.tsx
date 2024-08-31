import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type ButtonPropTypes = {
  label?: string;
  styles?: object;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ label, styles, disabled, onClick }: ButtonPropTypes) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={[defaultStyles.button, styles]}
    >
      <Text style={defaultStyles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const defaultStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#F9C74F',
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    color:'white'
  },
  text: {
    fontFamily: 'MonsterBold',
    fontSize: 18, // Added font size to match text-xl
   color:'white'
  },
});
