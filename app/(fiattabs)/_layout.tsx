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
        name="limit"
        options={{
          title: 'Limits',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign size={28}  name={focused ? 'swap' : 'swap'} color={color}  />
          ),
        }}
      />
    
    <Tabs.Screen
        name="quickaction"
        
        options={{
          title:'Action',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'send-sharp' : 'send-outline'} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'time-sharp' : 'time-outline'} color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
