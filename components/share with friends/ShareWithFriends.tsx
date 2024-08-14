import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Bag from '@/assets/svg/bag.svg'

const ReferralScreen = () => {
  const referralLink = "https://www.giottus.com/?refcode=";

  const copyToClipboard = () => {
    Clipboard.setStringAsync(referralLink).then(() => {
      Alert.alert("Copied to Clipboard", "Your referral link has been copied!");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Bag/>
      </View>
      <Text style={styles.title}>Refer and Earn 2% Commission</Text>
      <Text style={styles.description}>
        Refer friends to Connet app and get rewarded! Share your unique referral link or code and earn 2% offer on your next transaction for each successful referral.
      </Text>
      <View style={styles.referralContainer}>
        <Text style={styles.referralLink}>{referralLink}</Text>
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={styles.copyButtonText}>Copy Code</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#ffeb3b',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:'MonsterBold'
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
      fontFamily:'MonsterReg'
  },
  referralContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:50
  },
  referralLink: {
    fontSize: 14,
    color: '#000',
    marginRight: 10,
      fontFamily:'MonsterReg'
  },
  copyButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffeb3b',
    borderRadius: 5,
  },
  copyButtonText: {
    color: '#000',
      fontFamily:'MonsterBold'
  },
  shareButton: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#ffeb3b',
    borderRadius: 5,
    width:'100%',
    marginTop:100
  },
  shareButtonText: {
    fontFamily:'MonsterBold',
    color: '#000',
    textAlign:'center'
  },
});

export default ReferralScreen;
