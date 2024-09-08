import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from '../ThemedText';

// Type definitions for the component
type SwitchToggleFunction = (value: boolean) => void;

const NotificationsScreen: React.FC = () => {
  const [pushNotification, setPushNotification] = useState<boolean>(false);
  const [generalNotification, setGeneralNotification] = useState<boolean>(false);
  const [sound, setSound] = useState<boolean>(false);
  const [vibrate, setVibrate] = useState<boolean>(false);
  const [appUpdates, setAppUpdates] = useState<boolean>(false);
  const [newServices, setNewServices] = useState<boolean>(false);
  const [newTips, setNewTips] = useState<boolean>(false);

  // Type the setter function
  const toggleSwitch = (setter: SwitchToggleFunction) => (value: boolean) => setter(value);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Push Notification</ThemedText>
        <View style={styles.switchRow}>
          <View>
            <ThemedText style={styles.subText}>Take a break</ThemedText>
            <ThemedText style={styles.subText}>Pause notifications for a short time</ThemedText>
          </View>
          <Switch
            onValueChange={toggleSwitch(setPushNotification)}
            value={pushNotification}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={pushNotification ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Customize Notifications</ThemedText>
        <ThemedText style={styles.subText}>Choose the messages you'd like to receive</ThemedText>
        {renderSwitch("General Notification", generalNotification, toggleSwitch(setGeneralNotification))}
        {renderSwitch("Sound", sound, toggleSwitch(setSound))}
        {renderSwitch("Vibrate", vibrate, toggleSwitch(setVibrate))}
        {renderSwitch("App Updates", appUpdates, toggleSwitch(setAppUpdates))}
        {renderSwitch("New Services Available", newServices, toggleSwitch(setNewServices))}
        {renderSwitch("New Tips Available", newTips, toggleSwitch(setNewTips))}
      </View>
    </View>
  );
};

// Type the parameters for renderSwitch function
const renderSwitch = (label: string, state: boolean, toggleFunction: SwitchToggleFunction) => (
  <View style={styles.switchContainer}>
    <ThemedText style={styles.switchLabel}>{label}</ThemedText>
    <Switch
      onValueChange={toggleFunction}
      value={state}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={state ? "#f5dd4b" : "#f4f3f4"}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'MonsterBold',
    marginBottom: 10,
  },
  subText: {
    color: 'gray',
    marginBottom: 5,
    fontFamily: 'MonsterReg',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: 'MonsterReg',
  },
});

export default NotificationsScreen;
