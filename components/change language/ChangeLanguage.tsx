import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇦🇪' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const changeLanguage = (languageCode:any) => {
    console.log(languageCode)
    setSelectedLanguage(languageCode);
  };

  return (
    <View style={styles.container}>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageButton,
            selectedLanguage === language.code && styles.activeLanguage,
          ]}
          onPress={() => changeLanguage(language.code)}
        >
          <ThemedText style={[styles.flag, {color: selectedLanguage ? 'red':'white'}]}>{language.flag}</ThemedText>
          <ThemedText style={styles.languageName}>{language.name}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical:27
  },
  activeLanguage: {
    backgroundColor: '#FFFFE0', // Light yellow color for active state
    borderColor: '#FFD700', // Gold color for active border
  },
  flag: {
    fontSize: 24,
    marginRight: 10,
  },
  languageName: {
    fontSize: 18,
    fontFamily:'MonsterReg'
  },
});

export default LanguageSelector;
