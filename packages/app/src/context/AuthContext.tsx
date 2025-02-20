import { userApi } from "@/lib/apis/userApi";
import type { SignInUser } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: SignInUser | null;
  isLoading: boolean;
  signIn: (user: SignInUser) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<SignInUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setUser(null);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (credentials: SignInUser) => {
    const response = await userApi.signIn(credentials);
    setUser(response.data?.user ?? null);
  };

  const signOut = async () => {
    await userApi.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
