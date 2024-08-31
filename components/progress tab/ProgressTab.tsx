import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ currentStep, totalSteps = 3}:any) => {
  const stepWidth = 100 / totalSteps;

  return (
    <View style={styles.progressBar}>
      {[...Array(totalSteps)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.step,
            {
              backgroundColor: index < currentStep ? '#F9C74F' : '#ccc',
              width: `${stepWidth}%`,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
    width:250,
    zIndex:-10
  },
  step: {
    height: '100%',
    marginHorizontal:5,
flex:1
  },
});

export default ProgressBar;
