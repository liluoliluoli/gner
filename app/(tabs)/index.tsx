import * as React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getWatchHistory, VideoItem } from '../services/api';
import VideoCard from '../components/VideoCard';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const { data: history, isLoading } = useQuery<VideoItem[]>(['history'], getWatchHistory);

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <VideoCard
            item={item}
            onPress={() => router.push({
              pathname: '/player',
              params: { videoId: item.id }
            })}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
  },
}); 