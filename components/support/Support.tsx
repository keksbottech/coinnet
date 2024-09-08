import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { axios } from '@/lib/axios';
import Loading from '../loading/Loading';
import { ToastAndroid } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useAppSelector } from '@/hooks/useAppSelector';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactUs = () => {
  const [countryCode, setCountryCode] = useState('NG');
  const [country, setCountry] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false)
  const theme = useAppSelector(state => state.theme.theme)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { name, email, phoneNumber, message } = data;
    try {
      setIsLoading(true);
      const code = country?.callingCode[0] || '234';

      const body = {
        name,
        email,
        description: message,
        phone: `${code}${phoneNumber}`
      };
      const response = await axios.post('support', body);

      ToastAndroid.show('Message sent successfully!', ToastAndroid.SHORT);

      console.log(response.data);
    } catch (err) {
      console.log(err);
      ToastAndroid.show('Something went wrong! Try again', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <ThemedText style={styles.headerText}>Contact us for Coinnet</ThemedText>
            <View style={styles.infoContainer}>
              <Ionicons name="location-sharp" size={20} color={theme ? 'white': "black"} />
              <ThemedText style={styles.infoText}>
                House# 72, Road# 21, Banani, Dhaka-1213 (near Banani Bidyaniketon School & College, beside University of Nigeria)
              </ThemedText>
            </View>
            <View style={styles.infoContainer}>
              <Ionicons name="call-sharp" size={20} color={theme ? 'white': "black"} />
              <ThemedText style={styles.infoText}>Call: 13301 (24/7)</ThemedText>
            </View>
            <View style={styles.infoContainer}>
              <Ionicons name="mail-sharp" size={20} color={theme ? 'white': "black"} />
              <ThemedText style={styles.infoText}>Email: support@coinnet.com</ThemedText>
            </View>

            <ThemedText style={{ fontFamily: 'MonsterBold', fontSize: 18, paddingVertical: 20 }}>Send Message</ThemedText>

            <Controller
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                placeholderTextColor={'#ccc'}
                  style={styles.input}
                  placeholder="Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
              defaultValue=""
            />
            {errors.name && <ThemedText style={styles.errorText}>{errors.name.message}</ThemedText>}

            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                placeholderTextColor={'#ccc'}
                  style={styles.input}
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                />
              )}
              name="email"
              defaultValue=""
            />
            {errors.email && <ThemedText style={styles.errorText}>{errors.email.message}</ThemedText>}

            <View style={styles.phoneContainer}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton={false}
                withCallingCode
                withEmoji
                onSelect={(country) => {
                  setCountryCode(country.cca2);
                  setCountry(country);
                }}
                containerButtonStyle={styles.countryPicker}
              />
              <ThemedText style={styles.callingCode}>+{country?.callingCode}</ThemedText>

              <Controller
                control={control}
                rules={{
                  required: 'Phone number is required',
                  minLength: {
                    value: 10,
                    message: 'Phone number must be at least 10 digits',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                  placeholderTextColor={'#ccc'}
                    style={styles.phoneInput}
                    placeholder="Your mobile number"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType="phone-pad"
                  />
                )}
                name="phoneNumber"
                defaultValue=""
              />
            </View>
            {errors.phoneNumber && <ThemedText style={styles.errorText}>{errors.phoneNumber.message}</ThemedText>}

            <Controller
              control={control}
              rules={{ required: 'Message is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                placeholderTextColor={'#ccc'}
                  style={[styles.input, styles.textArea]}
                  placeholder="Write your text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                />
              )}
              name="message"
              defaultValue=""
            />
            {errors.message && <ThemedText style={styles.errorText}>{errors.message.message}</ThemedText>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
              <ThemedText style={styles.buttonText}>Send Message</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 21,
    fontFamily: 'MonsterBold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#ccc',
    fontFamily: 'MonsterReg',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    fontFamily: 'MonsterReg',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  countryPicker: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  callingCode: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'MonsterBold',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default ContactUs;
