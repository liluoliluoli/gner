import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isLoading: boolean;
  userToken: string | null;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  isLoading: true,
  userToken: null,
  signIn: async () => {},
  signOut: async () => {},
};

const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (error) {
      console.error('Error checking token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  const value = {
    isLoading,
    userToken,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 