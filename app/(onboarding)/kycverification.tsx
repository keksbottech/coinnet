import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Input from '@/components/ui/input/Input';
import Button from '@/components/ui/button/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '@/components/progress tab/ProgressTab';
import { useRouter } from 'expo-router';
import Fingerprint from '@/assets/svg/fingerprint.svg';

const KycVerification = () => {
  const router = useRouter();

  const navigateToFacialRecognition = () => {
    router.push('/(onboarding)/bvnfacecapture');
  };

  return (
    <SafeAreaView style={{ padding: 10, flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <PageHeader label={<ProgressBar currentStep={3} />} />

            <View style={styles.container}>
              <View style={styles.header}>
                <Fingerprint />
                <Text style={styles.title}>KYC Verification</Text>
              </View>

              <Text style={styles.description}>
                Verify your identity! Upload a government-issued ID (Passport, driver’s license, national ID card) to complete KYC verification, secure your account, and unlock full platform features.
              </Text>

              <View style={styles.inputGroup}>
                <View>
                  <Text style={[styles.text, { marginBottom: 10 }]}>Enter your BVN Number</Text>
                  <Input style={styles.input} placeholder="83**********" />
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text style={[styles.text, { marginBottom: 10 }]}>NIN Number</Text>
                  <Input style={styles.input} placeholder="83**********" />
                </View>
              </View>

              <View style={styles.uploadLinkContainer}>
                <TouchableOpacity style={{ marginRight: 5 }}>
                  <Text style={styles.uploadLink}>Click Here</Text>
                </TouchableOpacity>
                <Text style={styles.text}>to upload NIN Slip</Text>
              </View>
            </View>
            <Button styles={{position:'relative'}} onClick={navigateToFacialRecognition} label="Continue" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default KycVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    paddingVertical: 10,
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    marginVertical: 10,
    fontFamily: 'MonsterReg',
  },
  inputGroup: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
  },
  uploadLinkContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  uploadLink: {
    color: '#FFD700',
    fontFamily: 'MonsterBold',
  },
  text: {
    fontFamily: 'MonsterBold',
  },
});
