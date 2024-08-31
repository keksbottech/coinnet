import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NumberStepProgress = ({currentStep} :any) => {
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      // setCurrentStep(currentStep + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <TouchableOpacity
              style={[
                styles.circle,
                {
                  backgroundColor: currentStep >= step ? 'yellow' : 'white',
                  borderColor: currentStep >= step ? 'yellow' : '#ccc',
                },
              ]}
              onPress={() => currentStep(step)}
            >
              <Text style={[styles.circleText, { color: currentStep >= step ? 'black' : '#ccc' }]}>{step}</Text>
            </TouchableOpacity>
            {index < 2 && (
              <View
                style={[
                  styles.line,
                  { backgroundColor: currentStep > step ? 'yellow' : '#ccc' },
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Button to go to the next step
      {currentStep < 3 && (
        <TouchableOpacity onPress={handleNextStep} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  circleText: {
    fontWeight: 'bold',
  },
  line: {
    width: 50,
    height: 2,
    marginHorizontal: 5,
  },
  nextButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NumberStepProgress;
