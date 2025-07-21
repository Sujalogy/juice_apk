// hooks/useAuth.js

import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

const useAuth = () => {
  const [user, setUser] = useState(null); // Represents the logged-in user object
  const [role, setRole] = useState(null); // 'user', 'juice_stall_owner', 'super_admin'
  const [isLoading, setIsLoading] = useState(true); // To check if auth state is being loaded

  // Mock authentication function
  const signIn = async (username, password) => {
    setIsLoading(true);
    // Simulate API call with dummy users
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'stallowner' && password === 'password') {
          const mockUser = { id: 'owner123', username: 'stallowner', role: 'juice_stall_owner' };
          setUser(mockUser);
          setRole(mockUser.role);
          resolve({ success: true, user: mockUser });
        } else if (username === 'customer' && password === 'password') {
          const mockUser = { id: 'customer456', username: 'customer', role: 'user' };
          setUser(mockUser);
          setRole(mockUser.role);
          resolve({ success: true, user: mockUser });
        } else if (username === 'admin' && password === 'password') {
          const mockUser = { id: 'admin789', username: 'admin', role: 'super_admin' };
          setUser(mockUser);
          setRole(mockUser.role);
          resolve({ success: true, user: mockUser });
        } else {
          resolve({ success: false, error: 'Invalid credentials' });
        }
        setIsLoading(false);
      }, 1500);
    });
  };

  const signUp = async (username, email, phone, password, role = 'user') => {
    setIsLoading(true);
    // Simulate API call for signup with a new dummy user
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Simulating signup for:', { username, email, phone, password, role });
        // For demo, we'll auto-login the new user
        const newMockUser = { id: `new_${Date.now()}`, username, role };
        setUser(newMockUser);
        setRole(newMockUser.role);
        setIsLoading(false);
        resolve({ success: true, user: newMockUser });
      }, 2000);
    });
  };

  const signOut = async () => {
    setIsLoading(true);
    // Simulate API call for sign out
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(null);
        setRole(null);
        setIsLoading(false);
        resolve({ success: true });
      }, 500);
    });
  };

  useEffect(() => {
    // Simulate initial auth check (e.g., checking for stored token)
    setTimeout(() => {
      // For this dummy implementation, assume no user is initially logged in
      setIsLoading(false);
    }, 1000);
  }, []);

  return { user, role, isLoading, signIn, signUp, signOut };
};

// AuthProvider to wrap the app and provide the authentication context
export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to easily consume the authentication context in components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
