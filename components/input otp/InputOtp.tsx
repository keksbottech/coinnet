import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

// Define the types for your props and refs
type OTPInputProps = {
  numberOfInputs?: number;
  onOtpChange?: (otp: string) => void;
};

type OTPArray = string[];

const OTPInput = forwardRef<TextInput[], OTPInputProps>(({ numberOfInputs = 6, onOtpChange }, ref) => {
  const [otp, setOtp] = useState<OTPArray>(new Array(numberOfInputs).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useImperativeHandle(ref, () => inputRefs.current);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Trigger the callback with the updated OTP
    if (onOtpChange) {
      onOtpChange(newOtp.join(''));
    }

    // Automatically focus the next input
    if (text && index < numberOfInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (text === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      handleBackspace(otp[index], index);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: numberOfInputs }).map((_, index) => (
        <TextInput
          key={index}
          value={otp[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 2,
  },
});

export default OTPInput;
