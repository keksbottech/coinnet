import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '@/components/ui/input/Input';
import { useRouter } from 'expo-router';
import Button from '@/components/ui/button/Button';
import ProgressBar from '@/components/progress tab/ProgressTab';
import CheckboxWithLabel from '@/components/ui/checkbox/Checkbox';

const CreateAccount = () => {
  const router = useRouter();

  const navigateTo2StepVerification = () => {
    router.push('/(onboarding)/twostepverification');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <PageHeader label={<ProgressBar currentStep={1} />} />

          <View style={styles.container}>
            <View>
            <Text style={[styles.label, styles.title]}>Create your account</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <Input style={styles.input} placeholder="Mobbin" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <Input style={styles.input} placeholder="Mobbin" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <Input style={styles.input} placeholder="mobbin.cms2@gmail.com" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <Input style={styles.input} placeholder="XXXXXXXXXX" secureTextEntry />
            </View>

            <View style={styles.inputGroup}>
              <CheckboxWithLabel
                label={
                  <Text style={styles.text}>
                    I certify that I am 18 years of age or older, and I agree to the User Agreement and Privacy Policy.
                  </Text>
                }
              />
            </View>
            </View>

            <Button onClick={navigateTo2StepVerification} styles={{position:'relative'}} label="Start" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'space-between',
    // marginTop:15
  },
  title: {
    fontSize: 24,
    marginTop: 10,
  },
  inputGroup: {
    marginTop: 20,
  },
  label: {
    fontFamily: 'MonsterBold',
    fontSize: 16,
    marginBottom:10
  },
  input: {
    fontFamily: 'MonsterReg',
  },
  text: {
    fontFamily: 'MonsterReg',
  },
});
