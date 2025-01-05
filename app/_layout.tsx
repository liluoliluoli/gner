import { Stack } from 'expo-router';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="player" 
            options={{ 
              presentation: 'fullScreenModal',
              headerShown: false 
            }} 
          />
          <Stack.Screen name="search" options={{ title: '搜索' }} />
          <Stack.Screen name="login" options={{ title: '登录' }} />
          <Stack.Screen name="profile" options={{ title: '个人资料' }} />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
} 