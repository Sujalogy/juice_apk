// hooks/useAuth.tsx
// IMPORTANT: This file MUST be saved as hooks/useAuth.tsx (NOT .ts)

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useSegments, useRouter } from 'expo-router'; // Import useSegments and useRouter

// Define a type for your user object
interface UserType {
  id: string;
  username: string;
  role: 'user' | 'juice_stall_owner' | 'super_admin';
  // Add other user properties as needed (e.g., email, phone)
}

// Define the shape of the AuthContext value
interface AuthContextType {
  user: UserType | null;
  role: 'user' | 'juice_stall_owner' | 'super_admin' | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<{ success: boolean; user?: UserType; error?: string }>;
  signUp: (username: string, email: string, phone: string, password: string, role?: 'user') => Promise<{ success: boolean; user?: UserType; error?: string }>;
  signOut: () => Promise<{ success: boolean }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [role, setRole] = useState<'user' | 'juice_stall_owner' | 'super_admin' | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signIn = async (username: string, password: string): Promise<{ success: boolean; user?: UserType; error?: string }> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        let mockUser: UserType | undefined;
        if (username === 'stallowner' && password === 'password') {
          mockUser = { id: 'owner123', username: 'stallowner', role: 'juice_stall_owner' };
        } else if (username === 'customer' && password === 'password') {
          mockUser = { id: 'customer456', username: 'customer', role: 'user' };
        } else if (username == 'admin' && password == 'password') {
          mockUser = { id: 'admin789', username: 'admin', role: 'super_admin' };
        }

        if (mockUser) {
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

  const signUp = async (username: string, email: string, phone: string, password: string, role: 'user' = 'user'): Promise<{ success: boolean; user?: UserType; error?: string }> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Simulating signup for:', { username, email, phone, password, role });
        const newMockUser: UserType = { id: `new_${Date.now()}`, username, role };
        setUser(newMockUser);
        setRole(newMockUser.role);
        setIsLoading(false);
        resolve({ success: true, user: newMockUser });
      }, 2000);
    });
  };

  const signOut = async (): Promise<{ success: boolean }> => {
    setIsLoading(true);
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
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return { user, role, isLoading, signIn, signUp, signOut };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// This hook is used to manage the app's navigation state based on authentication.
export function useProtectedRoute(user: UserType | null, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait for authentication state to load

    const inAuthGroup = segments[0] === '(auth)';

    if (user && !inAuthGroup) {
      // User is authenticated, but not in the auth group, redirect to main app
      router.replace('/');
    } else if (!user && inAuthGroup) {
      // User is not authenticated, but in the auth group, stay there
      // This is handled by the Stack.Screen in _layout.tsx
    } else if (!user && !inAuthGroup) {
      // User is not authenticated and not in auth group, redirect to login
      router.replace('/login'); // Redirect to the login screen within the (auth) group
    }
  }, [user, isLoading, segments, router]);
}
