import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const router = useRouter();
  const { userToken } = useAuth();

  const handleProfilePress = () => {
    if (userToken) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Ionicons 
          name={userToken ? 'person' : 'person-outline'} 
          size={24} 
          color="black" 
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/search')}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
}); 