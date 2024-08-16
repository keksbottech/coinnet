import React, { useState } from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const ToggleSwitch = ({isToggled = false, onValueChange}) => {
 
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#E5E5E5", true: "#81b0ff" }}
        thumbColor={isToggled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={isToggled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ToggleSwitch;
