import { userApi } from '@/lib/apis/userApi';
import type { SignInUser } from '@/lib/types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
  user: SignInUser | null;
  isLoading: boolean;
  signIn: (user: SignInUser) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<SignInUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await userApi.getSession();
        setUser(session.data?.user ?? null);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = useCallback(async (credentials: SignInUser) => {
    const response = await userApi.signIn(credentials);
    setUser(response.data?.user ?? null);
  }, []);

  const signOut = useCallback(async () => {
    await userApi.signOut();
    setUser(null);
  }, []);

  const contextValue = useMemo(() => ({ user, isLoading, signIn, signOut }), [user, isLoading, signIn, signOut]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
