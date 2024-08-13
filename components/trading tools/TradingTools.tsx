import React from 'react';
import { View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TradingTools: React.FC = () => {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name="scan-outline" size={24} color="#555" style={styles.icon} />
      <Ionicons name="key-outline" size={24} color="#555" style={styles.icon} />
      <Ionicons name="create-outline" size={24} color="#555" style={styles.icon} />
      <Ionicons name="options-outline" size={24} color="#555" style={styles.icon} />
      <Ionicons name="expand-outline" size={24} color="#555" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5', // Change to the background color from the image
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default TradingTools;
