import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';  // Import Clipboard API
import { useRouter } from 'expo-router';


const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const router = useRouter()
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);


  const userId = 'ID 28954761';

  // Function to copy the user ID to the clipboard
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userId);
    Alert.alert('Copied to Clipboard', 'User ID has been copied to your clipboard.');
  };

  const navigateToNotification = () => {
    router.push('(other)/notificationsettings')
  }
  const navigateToLanguage = () => {
    router.push('(other)/changelanguage')
  }
  const navigateToLimitsAndFeatures = () => {
    router.push('(other)/limitsandfeatures')
  }
  const navigateToSecurity = () => {
    router.push('(other)/changepassword')
  }
  const navigateToSupport = () => {
    router.push('(other)/support')
  }
  const navigateToProfile = () => {
    router.push('(other)/profile')
  }
  const navigateToReferals = () => {
    router.push('(other)/sharewithfriends')
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={50} color="gray" />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Dmutro</Text>
          <Text style={styles.email}>t***@g***.com</Text>
          <View style={styles.idContainer}>
            <Text style={styles.id}>{userId}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Ionicons name="copy-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.verified}>
        <Ionicons name="checkmark-circle" size={24} color="green" />
        <Text style={styles.label}>Verified</Text>
        </View>
      </View>
      <Text style={styles.label}>Privacy</Text>

      <View style={styles.section}>
        <TouchableOpacity onPress={navigateToProfile} style={styles.row}>
          <Ionicons name="person-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Profile</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToSecurity} style={styles.row}>
          <Ionicons name="shield-checkmark-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Security</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Finance</Text>

      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Ionicons name="time-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>History</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToLimitsAndFeatures} style={styles.row}>
          <Ionicons name="wallet-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Limit and features</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Account</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Theme</Text>
          <Switch
            style={styles.switch}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>

        <TouchableOpacity onPress={navigateToNotification} style={styles.row}>
          <Ionicons name="notifications-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Notifications</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>More</Text>

      <View style={styles.section}>
        <TouchableOpacity onPress={navigateToLanguage} style={styles.row}>
          <Ionicons name="language-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Change Language</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToReferals} style={styles.row}>
          <Ionicons name="share-social-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Share with friends</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToSupport} style={styles.row}>
          <Ionicons name="help-circle-outline" size={24} style={styles.icon} />
          <Text style={styles.text}>Support</Text>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontSize: 18,
       fontFamily:'MonsterBold'
  },
  email: {
    color: 'gray',
       fontFamily:'MonsterMid'
  },
  id: {
    color: 'gray',
       fontFamily:'MonsterMid'
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    width: 30,
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
       fontFamily:'MonsterMid'
  },
  rightIcon: {
    color: '#ccc',
  },
  switch: {
    marginRight: 10,
  },
  verified:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'lightgreen',
    paddingVertical:6,
    paddingHorizontal:13,
    borderRadius:30
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label:{
    fontFamily:'MonsterMid',
    marginLeft:5
  }
});

export default SettingsScreen;
