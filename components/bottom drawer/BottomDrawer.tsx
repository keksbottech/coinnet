import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

const BottomDrawer = () => {
  const sheetRef = useRef(null);

  const renderContent = () => (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.sheetText}>Swipe down to close</Text>
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={['50%', '25%', '0%']} // Control the drawer's height
      borderRadius={10}
      renderContent={renderContent}
    />
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 450,
  },
  sheetText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default BottomDrawer;
