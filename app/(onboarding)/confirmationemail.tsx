import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EmailImage from '@/assets/svg/mail.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';

const ConfirmationEmail = () => {
  const router = useRouter();
  const userEmail = useAppSelector(state => state.user.userForgottenEmail);

  const navigateToPasswordReset2 = () => {
    router.push('/(onboarding)/passwordreset2');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<NumberStepProgress currentStep={1} />}
      />

      <View style={styles.container}>
        <View>
          <View>
            <EmailImage />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.title, styles.centerText, styles.titleSize]}>
              Confirm your email
            </Text>
            <Text style={[styles.text, styles.centerText, styles.description]}>
              We just sent you an email to {userEmail}
            </Text>
          </View>
        </View>

        <Button
          onClick={navigateToPasswordReset2}
          styles={{ bottom: 150 }}
          label="Continue"
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>I </Text>
          <Text style={[styles.footerText, styles.highlightText]}>
            didn't receive
          </Text>
          <Text style={styles.footerText}> my email</Text>
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
    backgroundColor: 'white',
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
