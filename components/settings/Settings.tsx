import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';  // Import Clipboard API
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Image } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getThemeData } from '@/lib/store/reducers/storeTheme';


const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const router = useRouter()
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const userData = useAppSelector(state => state.user.user)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.theme)

  const userId = `ID ${userData._id}`;

  // Function to copy the user ID to the clipboard
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(userId);
    Alert.alert('Copied to Clipboard', 'User ID has been copied to your clipboard.');
  };

  const formatEmail = () => {
    if (!userData?.email) return '';
  
    const [localPart, domain] = userData.email.split('@');
    const formattedLocal = `${localPart.charAt(0)}***${localPart.charAt(localPart.length - 1)}`;
    const formattedDomain = `${domain.charAt(0)}***${domain.charAt(domain.length - 1)}`;
    return `${formattedLocal}@${formattedDomain}`;
  };

  const navigateToNotification = () => {
    router.push('/(other)/notificationsettings')
  }
  const navigateToLanguage = () => {
    router.push('/(other)/changelanguage')
  }
  const navigateToLimitsAndFeatures = () => {
    router.push('/(other)/limitsandfeatures')
  }
  const navigateToSecurity = () => {
    router.push('/(other)/changepassword')
  }
  const navigateToSupport = () => {
    router.push('/(other)/support')
  }
  const navigateToProfile = () => {
    router.push('/(other)/profile')
  }
  const navigateToReferals = () => {
    router.push('/(other)/sharewithfriends')
  }

  const navigateToHistory = () => {
    router.push('/(trade)/transactionhistory')
  }

  // useEffect(() => {

  //   console.log(isDarkMode)
  // }, [isDarkMode])
  
  const toggleTheme = () => {
    dispatch(getThemeData(!theme))

  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      {userData?.profileImage ? (
          <Image source={{ uri: userData.profileImage }} style={styles.image} />
        ) : (
          <Ionicons name="person-circle-outline" size={50} color="gray" />
        )}
  
        <View style={styles.userInfo}>
          <ThemedText style={styles.username}>{`${userData.firstName} ${userData.lastName}`}</ThemedText>
          <ThemedText style={styles.email}>{formatEmail()}</ThemedText>
          <View style={styles.idContainer}>
            <ThemedText style={styles.id}>{userId}</ThemedText>
            <TouchableOpacity onPress={copyToClipboard}>
              <Ionicons name="copy-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.verified}>
        <Ionicons name="checkmark-circle" size={24} color="green" />
        <ThemedText style={styles.label}>Verified</ThemedText>
        </View>
      </View>
      <ThemedText style={styles.label}>Privacy</ThemedText>

      <View style={styles.section}>
        <TouchableOpacity onPress={navigateToProfile} style={styles.row}>
          <Ionicons name="person-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Profile</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToSecurity} style={styles.row}>
          <Ionicons name="shield-checkmark-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Security</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.label}>Finance</ThemedText>

      <View style={styles.section}>
        <TouchableOpacity onPress={navigateToHistory} style={styles.row}>
          <Ionicons name="time-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>History</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToLimitsAndFeatures} style={styles.row}>
          <Ionicons name="wallet-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Limit and features</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.label}>Account</ThemedText>

      <View style={styles.section}>
        <View style={styles.row}>
          <Ionicons name="moon-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Theme</ThemedText>
          <Switch
            style={styles.switch}
            onValueChange={toggleTheme}
            value={theme}
          />
        </View>

        <TouchableOpacity onPress={navigateToNotification} style={styles.row}>
          <Ionicons name="notifications-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Notifications</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>
      </View>

      <ThemedText style={styles.label}>More</ThemedText>

      <View style={styles.section}>
        <TouchableOpacity onPress={navigateToLanguage} style={styles.row}>
          <Ionicons name="language-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Change Language</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToReferals} style={styles.row}>
          <Ionicons name="share-social-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Share with friends</ThemedText>
          <Ionicons name="chevron-forward-outline" size={24} style={styles.rightIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToSupport} style={styles.row}>
          <Ionicons name="help-circle-outline" size={24} style={styles.icon} />
          <ThemedText style={styles.text}>Support</ThemedText>
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
    color:'#ccc'
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
  },
  image:{
    width:50,
    height:50,
    borderRadius:50
  }
});

export default SettingsScreen;
