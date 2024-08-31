import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import Button from '@/components/ui/button/Button';
import CheckImage from '@/assets/svg/check.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const AllDoneAccountCreation = () => {
  const router = useRouter();

  const navigateToPasswordReset = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CheckImage />
        <View>
          <Text style={styles.allDoneText}>All done</Text>
          <Text style={styles.congratsText}>
            Congratulations! Your account has been successfully added
          </Text>
        </View>
        <Button onClick={navigateToPasswordReset} label="Done" />
      </View>
    </SafeAreaView>
  );
};

export default AllDoneAccountCreation;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 80, // 20 * 4 for pt-20
    flexDirection: 'column',
    alignItems: 'center',
  },
  allDoneText: {
    textAlign: 'center',
    fontSize: 24, // text-3xl corresponds to 24px
    marginTop: 40, // mt-10 is 10 * 4 = 40px
    fontFamily: 'MonsterBold',
  },
  congratsText: {
    fontSize: 18, // text-xl corresponds to 18px
    color: '#6b7280', // text-gray-500 corresponds to this hex color in Tailwind
    textAlign: 'center',
    width: 300,
    marginTop: 10,
    fontFamily: 'MonsterReg',
  },
});
