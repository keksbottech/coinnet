import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useAppSelector } from '@/hooks/useAppSelector';
import { axios } from '@/lib/axios';
import Toast from 'react-native-toast-message';
import Loading from '../loading/Loading';
import Button from '../ui/button/Button';

const ChangePassword = () => {
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useAppSelector(state => state.user.user);

  const { control, handleSubmit, watch, setError, formState: { errors } } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
      return;
    }

    try {
      setIsLoading(true);

      const body = {
        userId: userData?.userAuthId,
        password: data.newPassword
      };

      const response = await axios.patch('user/update/password', body);

      console.log(response);

      Toast.show({
        type: 'success',
        text1: 'Password Updated'
      });

    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Unable to update password',
        text2: 'Check your connection and try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <View style={styles.container}>
        <Toast />
        
        {/* Old Password */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="oldPassword"
            rules={{ required: 'Old Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Old Password"
                secureTextEntry={!oldPasswordVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => setOldPasswordVisible(!oldPasswordVisible)}
          >
            <Ionicons
              name={oldPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errors.oldPassword && <Text style={styles.error}>{errors.oldPassword.message}</Text>}
        
        {/* New Password */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: 'New Password is required',
              minLength: { value: 8, message: 'New Password must be at least 8 characters long' }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry={!newPasswordVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => setNewPasswordVisible(!newPasswordVisible)}
          >
            <Ionicons
              name={newPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errors.newPassword && <Text style={styles.error}>{errors.newPassword.message}</Text>}
        
        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm Password is required',
              minLength: { value: 8, message: 'Confirm Password must be at least 8 characters long' }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!confirmPasswordVisible}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <Ionicons
              name={confirmPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}

        {/* Submit Button */}
        <Button onClick={handleSubmit(onSubmit)} styles={styles.button} label='Change Password' />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    fontFamily: 'MonsterReg',
  },
  button: {
    alignItems: 'center',
    position:'relative',
    top:40
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'MonsterBold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'MonsterBold',
  },
});

export default ChangePassword;
