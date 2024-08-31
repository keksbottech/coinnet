import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

const FormatDate: React.FC<{ date: Date }> = ({ date }) => {
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

  },
  text: {
    fontSize: 16,
    fontFamily:'MonsterMid'
  },
});

export default FormatDate;
