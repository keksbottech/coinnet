import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const categories = [
  { name: 'BTC', percentage: '46%', color: '#FFD700' },
  { name: 'ATOM', percentage: '35%', color: '#00CDA1' },
  { name: 'ETH', percentage: '10%', color: '#0080FF' },
  { name: 'CRO', percentage: '7%', color: '#AA00FF' },
];

const CategoryButton = ({ name, percentage, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, { backgroundColor: color }]}
      onPress={() => onPress(name)}
    >
      <Text style={styles.categoryText}>{`${name} ${percentage}`}</Text>
    </TouchableOpacity>
  );
};

const AssetsCategories = () => {
  const handlePress = (name) => {
    Alert.alert(`You clicked on: ${name}`);
  };

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <CategoryButton
          key={category.name}
          name={category.name}
          percentage={category.percentage}
          color={category.color}
          onPress={handlePress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  categoryButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AssetsCategories;
