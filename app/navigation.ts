import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  '(tabs)': undefined;
  'player': { videoId: string | number };
  'search': undefined;
  'login': undefined;
  'profile': undefined;
};

export type TabParamList = {
  'index': undefined;
  'movies': undefined;
  'tv-shows': undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = 
  NativeStackScreenProps<TabParamList, T>; 