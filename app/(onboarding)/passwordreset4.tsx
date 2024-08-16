import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Button from '@/components/ui/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import NumberStepProgress from '@/components/number step progress/NumberStepProgress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ShieldImage from '@/assets/svg/shield.svg';
import { useRouter } from 'expo-router';

const PasswordReset4 = () => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/(tabs)/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader 
        icon={<FontAwesome name="angle-left" size={24} color="black" />} 
        label={<NumberStepProgress currentStep={3} />}
      />
       
      <View style={styles.contentContainer}>
        <View>
          <ShieldImage />
        </View>

        <Text style={styles.congratsText}>
          Congratulations!
        </Text>

        <Text style={styles.infoText}>
          You have successfully created a new password, click continue to enter the application.
        </Text>

        <Button onClick={navigateToHome} styles={styles.button} label='Continue' />
      </View>
    </SafeAreaView>
  );
}

export default PasswordReset4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 26,
    fontFamily: 'MonsterBold',
    textAlign: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'MonsterBold',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    position: 'absolute',
    bottom: 100,
  },
});
