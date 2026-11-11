import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { getStoredAdminSession, setStoredAdminSession } from '../utils/storage';

interface AuthContextType {
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  login: (usernameOrEmail: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
}

const HARDCODED_ADMIN: AdminUser = {
  id: 'adm-001',
  email: 'admin@company.com',
  name: 'Corporate Training Administrator',
  role: 'admin',
};

// Hardcoded accepted credentials
const VALID_CREDENTIALS = [
  { username: 'admin@company.com', password: 'admin123' },
  { username: 'admin', password: 'admin123' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const isLogged = getStoredAdminSession();
    if (isLogged) {
      setIsAdminLoggedIn(true);
      setAdminUser(HARDCODED_ADMIN);
    }
  }, []);

  const login = (usernameOrEmail: string, pass: string) => {
    const trimmedUser = usernameOrEmail.trim().toLowerCase();
    const isMatch = VALID_CREDENTIALS.some(
      (c) => c.username.toLowerCase() === trimmedUser && c.password === pass
    );

    if (isMatch) {
      setIsAdminLoggedIn(true);
      setAdminUser(HARDCODED_ADMIN);
      setStoredAdminSession(true);
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Invalid credentials. Please use username: admin@company.com and password: admin123',
      };
    }
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    setStoredAdminSession(false);
  };

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, adminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
