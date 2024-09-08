import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ConfirmationBuy from '@/components/confirmation buy/ConfirmationBuy';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeader from '@/components/page header/PageHeader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomDrawer from '@/components/bottom drawer/BottomDrawer';
import { TouchableOpacity } from 'react-native';
import PaymentBottomDrawer from '@/components/payment bottom drawer/PaymentBottomDrawer';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ThemedText } from '@/components/ThemedText';

const ConfirmBuy = () => {
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);
  const theme = useAppSelector(state => state.theme.theme)
  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };

  return (
    <>
      <SafeAreaView style={[styles.safeAreaView, {backgroundColor:theme ? '#0F0F0F': 'white'}]}>
        <PageHeader
          other={<AntDesign name="infocirlceo" size={24} color={theme ? 'white': "black"} />}
          icon={<FontAwesome name="angle-left" size={24} color={theme ? 'white': "black"} />}
          label={<ThemedText style={styles.headerText}>Confirmation</ThemedText>}
        />
        <View style={styles.container}>
          <ConfirmationBuy enableBottomDrawerFunc={enableBottomDrawer} />
        </View>
      </SafeAreaView>
      {isBottomDrawerEnabled && <PaymentBottomDrawer />}
    </>
  );
};

export default ConfirmBuy;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'MonsterBold',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
