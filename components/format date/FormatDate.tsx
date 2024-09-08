import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { ThemedText } from '../ThemedText';

const FormatDate: React.FC<{ date: Date }> = ({ date }) => {
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{formattedDate}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  text: {
    fontSize: 14,
    fontFamily:'MonsterMid'
  },
});

export default FormatDate;
