import * as React from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import {getMovies, getTVShows, VideoItem} from '../services/api';
import VideoCard from '../components/VideoCard';
import { useRouter } from 'expo-router';

export default function TVShowsScreen() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useQuery({
    queryKey:[page],
    queryFn: () => getTVShows(page)
  });

  const handleLoadMore = () => {
    if (data?.hasMore) {
      setPage(prev => prev + 1);
    }
  };

  if (isLoading && page === 1) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.shows}
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isLoading ? <ActivityIndicator style={styles.footerLoader} /> : null
        }
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
  footerLoader: {
    padding: 10,
  },
});
