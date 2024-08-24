import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { getMarketData } from '@/lib/store/reducers/storeMarketData'; // Import selector
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';

type TabProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

const Tab: React.FC<TabProps> = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, active ? styles.activeTab : null]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, active ? styles.activeTabText : null]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const PopularTradeHeads: React.FC<{data: string[]}> = ({ data }) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.market.popularPairs); // Retrieve active tab from the store

  const changeMarketHeaderPair = (item: string) => {
    // setActiveTab(item);
    dispatch(getMarketData(item)); // Dispatch the action with the selected item
  };

  return (
    <View style={styles.tabsContainer}>
      <FlatList
        horizontal
        contentContainerStyle={{ paddingVertical: 5 }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Tab
            key={item}
            label={item}
            active={activeTab === item} // Check if the current tab is active
            onPress={() => changeMarketHeaderPair(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTab: {
    backgroundColor: '#FFFF00', // Yellow color for active tab
  },
  tabText: {
    color: '#555',
    fontFamily: 'MonsterReg',
  },
  activeTabText: {
    color: '#000', // Text color for active tab
  },
});

export default PopularTradeHeads;
