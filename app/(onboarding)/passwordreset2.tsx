import { StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ContinueWithOauth from '@/components/continue with oauth/ContinueWithOauth';
import Input from '@/components/ui/input/Input';
import OTPInput from '@/components/input otp/InputOtp';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MailTwo from '@/assets/svg/mail1.svg';
import Button from '@/components/ui/button/Button';
import { useRouter } from 'expo-router';

const Passwordreset2 = () => {
  const router = useRouter();

  const navigateToPasswordReset3 = () => {
    router.push('/(onboarding)/passwordreset3');
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor:'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PageHeader
            icon={<FontAwesome name="angle-left" size={24} color="black" />}
            label={<NumberStepProgress currentStep={2}/>}
          />

          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Please enter the code</Text>
              <Text style={styles.subtitle}>
                We sent an email to tomododj@kd.com
              </Text>
            </View>

            <View style={styles.mailIconContainer}>
              <MailTwo />
            </View>

            <View style={styles.otpContainer}>
              <OTPInput />
            </View>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't get an email?</Text>
              <TouchableOpacity>
                <Text style={styles.resendLink}>Send again</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={navigateToPasswordReset3} style={styles.button}>
  <Text style={styles.buttonText}>Entered</Text>
</TouchableOpacity>
      

            <ContinueWithOauth styles={styles.oauth} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Passwordreset2;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily:'MonsterBold'
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
        fontFamily:'MonsterBold'
  },
  mailIconContainer: {
    marginTop: 20,
  },
  otpContainer: {
    marginTop: 20,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    fontFamily:'MonsterBold'
  },
  resendLink: {
    fontSize: 14,
    color: 'orangered',
    marginLeft: 5,
        fontFamily:'MonsterBold'
  },
  button: {
    backgroundColor: 'lightgray',
    top: 50,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:20,
    borderRadius:10,
    
  },
  oauth: {
    top: 150,
  },
    buttonText:{
    fontFamily:'MonsterBold'
  }
});
