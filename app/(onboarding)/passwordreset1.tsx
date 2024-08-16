import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Input from '@/components/ui/input/Input';
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const Passwordreset = () => {
  const router = useRouter();

  const navigateToEmailSentLetter = () => {
    router.push('/(onboarding)/confirmationemail');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ padding: 10, flexGrow: 1 }}>
          <PageHeader
            icon={<FontAwesome name="angle-left" size={24} color="black" />}
            label={<NumberStepProgress currentStep={1} />}
          />

          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Password reset</Text>
              <Text style={styles.description}>
                Please enter your registered email address to reset your password
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={24}
                color="black"
                style={styles.inputIcon}
              />
              <Input
                style={styles.input}
                placeholder="Email address"
              />
              <FontAwesome5
                name="check-circle"
                size={24}
                color="green"
                style={styles.checkIcon}
              />
            </View>

<TouchableOpacity onPress={navigateToEmailSentLetter} style={styles.button}>
  <Text style={styles.buttonText}>Continue</Text>
</TouchableOpacity>
      

            <Text style={styles.termsText}>
              By registering you accept our Terms & Conditions and Privacy Policy. Your data will be securely encrypted with TLS
            </Text>

            <ContinueWithOauth styles={styles.oauth} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Passwordreset;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    fontFamily:'MonsterBold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 14,  
      fontFamily:'MonsterBold',
    width: 300,
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    marginTop: 15,
  },
  input: {
    paddingLeft: 45,
    flex: 1,
        fontFamily:'MonsterReg'
  },
  checkIcon: {
    position: 'absolute',
    right: 10,
    marginTop: 15,
  },
  button: {
    backgroundColor: '#eee',
    top: 100,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20,
    borderRadius:10,
    
  },
  termsText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 140,
        fontFamily:'MonsterBold'
  },
  oauth: {
    top: 100,
  },
  buttonText:{
    fontFamily:'MonsterBold'
  }
});
