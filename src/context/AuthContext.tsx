import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('mku_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('mku_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mku_user');
    }
  }, [user]);

  const login = async (credentials: { email: string; password: string }) => {
    // For testing purposes, accept any @students.mku.ac.ke email
    if (credentials.email.endsWith('@students.mku.ac.ke') && credentials.password.length >= 6) {
      const studentName = credentials.email.split('@')[0];
      const userData = {
        id: '1',
        name: studentName.charAt(0).toUpperCase() + studentName.slice(1),
        email: credentials.email,
        studentId: 'SCT121-0000/2024'
      };
      setUser(userData);
      toast.success(`Welcome back, ${userData.name}!`);
      return;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}