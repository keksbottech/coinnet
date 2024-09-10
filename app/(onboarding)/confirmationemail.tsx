import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EmailImage from '@/assets/svg/mail.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';
import { ToastAndroid } from 'react-native';

const ConfirmationEmail = () => {
  const router = useRouter();
  const userEmail = useAppSelector(state => state.user.userForgottenEmail);
  const theme = useAppSelector(state => state.theme.theme)

  const navigateToPasswordReset2 = () => {
    router.push('/(onboarding)/passwordreset2');
  };

  const navigateBackToEmail = () => {
    ToastAndroid.show('Make sure the email is correct and try again...', ToastAndroid.LONG);

    setTimeout(() => {
      router.back()
    }, 2000);
  }
  return (
    <SafeAreaView style={[styles.safeArea,  {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white':"black"} />}
        label={<NumberStepProgress currentStep={1} />}
      />

      <View style={styles.container}>
        <View>
          <View>
            <EmailImage />
          </View>

          <View style={styles.textContainer}>
            <ThemedText style={[styles.title, styles.centerText, styles.titleSize]}>
              Confirm your email
            </ThemedText>
            <ThemedText style={[styles.text, styles.centerText, styles.description]}>
              We just sent you an email to {userEmail}
            </ThemedText>
          </View>
        </View>

        <Button
          onClick={navigateToPasswordReset2}
          styles={{ bottom: 150 }}
          label="Continue"
        />
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>I </ThemedText>
          <TouchableOpacity onPress={navigateBackToEmail}>
          <ThemedText style={[styles.footerText, styles.highlightText]}>
            didn't receive
          </ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.footerText}> my email</ThemedText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmationEmail;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
  },
  container: {
    height: '100%',
    paddingTop: 20,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'MonsterBold',
  },
  text: {
    fontFamily: 'MonsterReg',
  },
  centerText: {
    textAlign: 'center',
  },
  titleSize: {
    fontSize: 32, // equivalent to text-4xl
  },
  description: {
    marginTop: 10,
    width: 230,
    fontSize: 18, // equivalent to text-lg
  },
  footer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  footerText: {
    fontSize: 18, // equivalent to text-lg
    fontFamily: 'MonsterBold',
  },
  highlightText: {
    color: '#F59E0B', // equivalent to text-yellow-500
  },
});
