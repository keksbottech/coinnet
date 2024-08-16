import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as LocalAuthentication from 'expo-local-authentication';

import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import Input from '@/components/ui/input/Input';
import ToggleSwitch from '@/components/switch/Switch';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';

const PasswordReset3 = () => {
  const [isFingerprintEnabled, setIsFingerprintEnabled] = useState(false);
  const router = useRouter();

  const navigateToPasswordReset4 = () => {
    router.push('/(onboarding)/passwordreset4');
  };

  const handleToggleSwitch = async () => {
    if (!isFingerprintEnabled) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware) {
        Alert.alert('Error', 'Your device does not support biometric authentication.');
        return;
      }

      if (!isEnrolled) {
        Alert.alert('Error', 'No biometrics are enrolled on this device.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to enable fingerprint',
      });

      if (result.success) {
        setIsFingerprintEnabled(true);
        console.log(result)
        Alert.alert('Success', 'Fingerprint authentication has been enabled.');
      } else {
        Alert.alert('Authentication failed', 'Fingerprint authentication could not be enabled.');
      }
    } else {
      setIsFingerprintEnabled(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PageHeader
            icon={<FontAwesome name="angle-left" size={24} color="black" />}
            label={<NumberStepProgress currentStep={3} />}
          />

          <View style={styles.content}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Create a password</Text>
              <Text style={styles.headerSubtitle}>
                The password must be 8 characters, including 1 uppercase letter, 1
                number, and 1 special character.
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <Input style={styles.input} placeholder="Password" />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <Input style={styles.input} placeholder="Confirm Password" />
              </View>

              <View style={styles.toggleContainer}>
                <Text style={styles.label}>Unlock with Touch ID?</Text>
                
                <ToggleSwitch
                  isToggled={isFingerprintEnabled}
                  onValueChange={handleToggleSwitch}
                />
              </View>
            </View>

            <Button
              onClick={navigateToPasswordReset4}
              styles={styles.button}
              label="Continue"
            />
            <Text style={styles.termsText}>
              By registering you accept our Terms & Conditions and Privacy Policy.
              Your data will be securely encrypted with TLS.
            </Text>
          </View>

          <View style={styles.oauthContainer}>
            <ContinueWithOauth styles={{ position: 'relative' }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PasswordReset3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  headerContent: {
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'MonsterBold',
  },
  headerSubtitle: {
    fontFamily: 'MonsterBold',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  formContainer: {
    marginTop: 40,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontFamily: 'MonsterBold',
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    marginTop: 8,
    fontFamily: 'MonsterReg',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    position: 'relative',
    marginTop: 50,
    backgroundColor:'lightgray'
  },
  termsText: {
    textAlign: 'center',
    fontFamily: 'MonsterBold',
    fontSize: 14,
    marginTop: 40,
  },
  oauthContainer: {
    paddingVertical: 50,
  },
});
