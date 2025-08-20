import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    password: '123456',
    role: 'formando',
    address: 'Lisboa, Portugal',
    phone: '+351 912 345 678',
    linkedin: 'linkedin.com/in/joaosilva',
    bio: 'Estudante de programação apaixonado por tecnologia.',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@exemplo.com',
    password: '123456',
    role: 'formador',
    address: 'Porto, Portugal',
    phone: '+351 913 456 789',
    linkedin: 'linkedin.com/in/mariasantos',
    bio: 'Formadora especializada em desenvolvimento web.',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@exemplo.com',
    password: '123456',
    role: 'admin',
    bio: 'Administrador do sistema.',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('elearning_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('elearning_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const register = async (userData) => {
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      return false;
    }

    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };

    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem('elearning_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('elearning_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};