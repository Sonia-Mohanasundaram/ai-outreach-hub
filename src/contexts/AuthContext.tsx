import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "user" | "admin") => void;
  signup: (name: string, email: string, password: string, role: "user" | "admin") => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: "user" | "admin") => {
    // API-ready: replace with actual auth call
    setUser({ id: crypto.randomUUID(), name: email.split("@")[0], email, role });
  };

  const signup = (name: string, email: string, _password: string, role: "user" | "admin") => {
    // API-ready: replace with actual signup call
    setUser({ id: crypto.randomUUID(), name, email, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
