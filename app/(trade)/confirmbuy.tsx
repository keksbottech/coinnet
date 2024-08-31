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

const ConfirmBuy = () => {
  const [isBottomDrawerEnabled, setIsBottomDrawerEnabled] = useState(false);

  const enableBottomDrawer = () => {
    setIsBottomDrawerEnabled(!isBottomDrawerEnabled);
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaView}>
        <PageHeader
          other={<AntDesign name="infocirlceo" size={24} color="black" />}
          icon={<FontAwesome name="angle-left" size={24} color="black" />}
          label={<Text style={styles.headerText}>Confirmation</Text>}
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
