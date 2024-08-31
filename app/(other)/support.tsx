import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PageHeader from '@/components/page header/PageHeader';
import Feather from '@expo/vector-icons/Feather';
import Input from '@/components/ui/input/Input';
import { TextArea } from 'tamagui';
import Button from '@/components/ui/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import ContactUs from '@/components/support/Support';

const Support = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <PageHeader
        icon={<FontAwesome name="angle-left" size={24} color="black" />}
        label={<Text style={styles.headerText}>Support</Text>}
      />
      <View style={styles.container}>
        <ContactUs />
      </View>
    </SafeAreaView>
  );
};

export default Support;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontFamily: 'MonsterBold',
    fontSize: 24,
  },
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
