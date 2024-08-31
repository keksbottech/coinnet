import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, StyleProp, TextStyle } from 'react-native';

interface InputPropTypes extends TextInputProps {
  style?: StyleProp<TextStyle>;
  readOnly?: boolean;
  onSubmit?: () => void;
}

const Input: React.FC<InputPropTypes> = ({
  style,
  placeholder,
  secureTextEntry = false,
  onSubmit,
  onBlur,
  value = '',
  onChangeText,
  readOnly = false,
  keyboardType = 'default',
  ...restProps
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={[styles.input, style]}
      onChangeText={onChangeText}
      value={`${value}`}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      onEndEditing={onSubmit}
      editable={!readOnly}
      {...restProps} // Spread other TextInputProps
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    borderStyle: 'solid',
    padding: 10,
    fontFamily: 'MonsterReg',
  },
});
