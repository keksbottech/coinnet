import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useAppSelector } from '@/hooks/useAppSelector';

const BottomDrawer = ({ ui, enablePanDownToClose = true }: any) => {
  const theme = useAppSelector(state => state.theme.theme)
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // snapPoints
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1} // Starting from the middle snap point
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={enablePanDownToClose} // Enable dragging down to close
      animateOnMount={true}
      backgroundStyle={{backgroundColor:theme ? '#0F0F0F': 'white'}}
    >
      <BottomSheetScrollView
        contentContainerStyle={[styles.scrollViewContent]} // Ensure the ScrollView content grows to fill available space
        showsVerticalScrollIndicator={false}
      >
        {ui}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    
  },
});

export default BottomDrawer;
