import * as React from 'react';
import { View, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { search } from '../services/api';
import VideoCard from '../components/VideoCard';
import { useRouter } from 'expo-router';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const { data: results, isLoading } = useQuery(
    ['search', query],
    () => search(query),
    {
      enabled: query.length >= 2,
    }
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="搜索电影、电视剧..."
        value={query}
        onChangeText={setQuery}
        autoFocus
      />
      
      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <VideoCard
              item={item}
              onPress={() => router.push({
                pathname: '/(modal)/player',
                params: { videoId: item.id }
              })}
            />
          )}
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 15,
    fontSize: 16,
    margin: 10,
  },
  loader: {
    marginTop: 20,
  },
}); 