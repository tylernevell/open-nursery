import { createContext, useContext, type ReactNode } from "react";
import { authClient } from "@/lib/apis/authClient";

export const AuthContext = createContext<ReturnType<
  typeof authClient.useSession
> | null>(null);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const session = authClient.useSession();

  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
