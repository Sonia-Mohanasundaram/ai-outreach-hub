import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "admin" | "doctor" | "patient";

export interface HospitalUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialization?: string;
}

interface AuthContextType {
  user: HospitalUser | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole, specialization?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const HospitalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<HospitalUser | null>(() => {
    const saved = localStorage.getItem("hms_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("hms_user", JSON.stringify(user));
    else localStorage.removeItem("hms_user");
  }, [user]);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    if (!email || !_password) return false;
    setUser({ id: crypto.randomUUID(), name: email.split("@")[0], email, role });
    return true;
  };

  const signup = (name: string, email: string, _password: string, role: UserRole, specialization?: string): boolean => {
    if (!name || !email || !_password) return false;
    setUser({ id: crypto.randomUUID(), name, email, role, specialization });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useHospitalAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useHospitalAuth must be used within HospitalAuthProvider");
  return ctx;
};
