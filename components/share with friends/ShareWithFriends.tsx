import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Bag from '@/assets/svg/bag.svg';
import { useAppSelector } from '@/hooks/useAppSelector';

const ReferralScreen = () => {
  const userData = useAppSelector(state => state.user.user)
  const referralLink = userData._id;

  const copyToClipboard = () => {
    Clipboard.setStringAsync(referralLink).then(() => {
      Alert.alert("Copied to Clipboard", "Your referral link has been copied!");
    });
  };

  const shareReferralLink = async () => {
    try {
      const result = await Share.share({
        message: `Check out this awesome app! Use my referral link to sign up: myapp://(onboarding)/create-account ${referralLink}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing link:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Bag />
      </View>
      <Text style={styles.title}>Refer and Earn 2% Commission</Text>
      <Text style={styles.description}>
        Refer friends to Connet app and get rewarded! Share your unique referral link or code and earn 2% off on your next transaction for each successful referral.
      </Text>
      <View style={styles.referralContainer}>
        <Text style={styles.referralLink}>{referralLink}</Text>
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Code</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={shareReferralLink} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'MonsterBold',
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    fontFamily: 'MonsterReg',
  },
  referralContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  referralLink: {
    fontSize: 14,
    color: '#000',
    marginRight: 10,
    fontFamily: 'MonsterReg',
  },
  copyButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffeb3b',
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#000',
    fontFamily: 'MonsterBold',
  },
  shareButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#ffeb3b',
    borderRadius: 5,
    width: '100%',
    marginTop: 100,
  },
  shareButtonText: {
    fontFamily: 'MonsterBold',
    color: '#000',
    textAlign: 'center',
  },
});

export default ReferralScreen;
