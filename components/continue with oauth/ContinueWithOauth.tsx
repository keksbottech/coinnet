import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Separator } from 'tamagui';
import GoogleImage from '@/assets/svg/google.svg';
import AppleImage from '@/assets/svg/apple.svg';
import FacebookImage from '@/assets/svg/facebook.svg';

type ContinueWithOauthTypes = {
  styles?: {}
}

const ContinueWithOauth = ({ styles }: ContinueWithOauthTypes) => {
  return (
    <View style={[styles, localStyles.container]}>
      <View style={localStyles.separatorContainer}>
        <Separator />
        <Text style={localStyles.text}>or continue with</Text>
        <Separator />
      </View>

      <View style={localStyles.iconContainer}>
        <TouchableOpacity style={localStyles.iconButton}>
          <FacebookImage />
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.iconButton}>
          <AppleImage />
        </TouchableOpacity>

        <TouchableOpacity style={localStyles.iconButton}>
          <GoogleImage />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ContinueWithOauth;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  text: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 10,
  },
});
