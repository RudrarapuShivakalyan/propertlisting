import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = () => {
      // In a real app, this would verify the token with your backend
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (isLoggedIn) {
        // For demo purposes, we'll just set a dummy user
        setCurrentUser({
          id: 1,
          name: 'Demo User',
          email: 'user@example.com'
        });
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token or user data in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      
      // Set the current user
      setCurrentUser({
        id: 1,
        name: 'Demo User',
        email
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  // Logout function
  const logout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('isLoggedIn');
    
    // Clear the current user
    setCurrentUser(null);
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll just simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token or user data in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      
      // Set the current user
      setCurrentUser({
        id: 1,
        name,
        email
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  // Value object that will be passed to any consuming components
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;