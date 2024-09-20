import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Define the type for category objects
interface Category {
  name: string;
  percentage: string;
  color: string;
}

const categories: Category[] = [
  { name: 'BTC', percentage: '46%', color: '#FFD700' },
  { name: 'ETH', percentage: '35%', color: '#00CDA1' },
  { name: 'BNB', percentage: '10%', color: '#0080FF' },
  { name: 'USDT', percentage: '7%', color: '#AA00FF' },
];

// Define the type for the props of CategoryButton
interface CategoryButtonProps {
  name: string;
  percentage: string;
  color: string;
  onPress: (name: string) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ name, percentage, color, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, { backgroundColor: color }]}
      onPress={() => onPress(name)}
    >
      <Text style={styles.categoryText}>{`${name} ${percentage}`}</Text>
    </TouchableOpacity>
  );
};

const AssetsCategories: React.FC = () => {
  // Typing the name parameter as string
  const handlePress = (name: string) => {
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
  
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontFamily: 'MonsterReg',
  },
});

export default AssetsCategories;
