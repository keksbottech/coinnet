import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const BottomDrawer = ({ui, enablePanDownToClose = true}:any) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // snapPoints
  const snapPoints = useMemo(() => ['25%', '50%', '90%', '100%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
  
      <BottomSheet
        ref={bottomSheetRef}
        index={1} // Starting from the lowest snap point
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose} // Enable dragging down to close
        animateOnMount={true}
        enableDynamicSizing={true}
      >
        <BottomSheetView style={styles.contentContainer}>
  {ui}
        </BottomSheetView>
      </BottomSheet>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    zIndex:10
  },
  contentContainer: {
    flex: 1,
  },
});

export default BottomDrawer;
