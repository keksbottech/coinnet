import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const NotificationsScreen = () => {
  const [pushNotification, setPushNotification] = useState(false);
  const [generalNotification, setGeneralNotification] = useState(false);
  const [sound, setSound] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [appUpdates, setAppUpdates] = useState(false);
  const [newServices, setNewServices] = useState(false);
  const [newTips, setNewTips] = useState(false);

  const toggleSwitch = (setter) => (value) => setter(value);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Push Notification</Text>
        <View className='flex flex-row items-center justify-between'style={{marginTop:5}}>
    <View >
        <Text style={styles.subText}>Take a break</Text>
        <Text style={styles.subText}>Pause notifications for a short time</Text>
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
        <Text style={styles.sectionTitle}>Customize Notifications</Text>
        <Text style={styles.subText}>Choose the messages you'd like to receive</Text>
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

const renderSwitch = (label, state, toggleFunction) => (
  <View style={styles.switchContainer}>
    <Text style={styles.switchLabel}>{label}</Text>
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
  
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
   fontFamily:'MonsterBold',
    marginBottom: 10,
  },
  subText: {
    color: 'gray',
    marginBottom: 5,
    fontFamily:'MonsterReg',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily:'MonsterReg',
  },
});

export default NotificationsScreen;
