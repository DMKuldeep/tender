import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "user" | "admin";

export interface AuthUser {
  name: string;
  email: string;
  company: string;
  role: UserRole;
  avatar: string;
  tenant: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

const MOCK_USERS: Record<UserRole, AuthUser> = {
  user: {
    name: "Arjun Sharma",
    email: "arjun@acmecorp.in",
    company: "Acme Infrastructure Ltd.",
    role: "user",
    avatar: "A",
    tenant: "Tenant A",
  },
  admin: {
    name: "Admin User",
    email: "admin@procurebrain.in",
    company: "ProcureBrain",
    role: "admin",
    avatar: "AD",
    tenant: "Platform",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const login  = (role: UserRole) => setUser(MOCK_USERS[role]);
  const logout = () => setUser(null);
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
