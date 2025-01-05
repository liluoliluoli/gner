import * as React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      header: () => <Header />,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '主页',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          title: '电影',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tv-shows"
        options={{
          title: '电视剧',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="tv" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 