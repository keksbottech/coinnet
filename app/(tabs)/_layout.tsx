import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppSelector } from '@/hooks/useAppSelector';

export default function TabLayout() {
  const colorScheme = useColorScheme();
const theme = useAppSelector(state => state.theme.theme)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'orangered',
        headerShown: false,
        tabBarLabelStyle:{fontSize:15},
        tabBarStyle:{height:60, backgroundColor:theme ? '#0F0F0F': 'white'}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: 'Trade',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign size={28}  name={focused ? 'swap' : 'swap'} color={color}  />
          ),
        }}
      />
            <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'stats-chart-sharp' : 'stats-chart-outline'} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="p2p"
        options={{
          title: 'P2P Trade',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'people' : 'people-outline'} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'wallet' : 'wallet-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
