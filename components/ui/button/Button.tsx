import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { ReactNode } from 'react';

type ButtonPropTypes = {
  label?: string;
  styles?: object;
  onClick?: () => void;
  disabled?: boolean;
  textStyle?: object
};

const Button = ({ label, styles, disabled, onClick, textStyle }: ButtonPropTypes) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onClick}
      style={[defaultStyles.button, styles]}
    >
      <Text style={[defaultStyles.text, textStyle]}>{label}</Text>
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
    backgroundColor: 'yellow',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    color:'white',
  },
  text: {
    fontFamily: 'MonsterBold',
    fontSize: 18, // Added font size to match text-xl
   color:'black'
  },
});
