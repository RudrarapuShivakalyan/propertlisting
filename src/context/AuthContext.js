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
        // Get user role from localStorage
        const userRole = localStorage.getItem('userRole') || 'user';
        
        // For demo purposes, we'll just set a dummy user
        setCurrentUser({
          id: 1,
          name: localStorage.getItem('userName') || 'Demo User',
          email: localStorage.getItem('userEmail') || 'user@example.com',
          role: userRole
        });
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password, role = 'user') => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll just simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token or user data in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', role);
      
      let userName = 'Demo User';
      if (role === 'agent') {
        userName = 'Agent User';
      }
      localStorage.setItem('userName', userName);
      
      // Set the current user
      setCurrentUser({
        id: 1,
        name: userName,
        email,
        role
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  // Agent login function
  const loginAsAgent = async (email, password) => {
    return login(email, password, 'agent');
  };

  // Logout function
  const logout = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    
    // Clear the current user
    setCurrentUser(null);
  };

  // Register function
  const register = async (name, email, password, role = 'user') => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll just simulate a successful registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token or user data in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', name);
      localStorage.setItem('userRole', role);
      
      // Set the current user
      setCurrentUser({
        id: 1,
        name,
        email,
        role
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };
  
  // Register as agent function
  const registerAsAgent = async (name, email, password) => {
    return register(name, email, password, 'agent');
  };

  // Value object that will be passed to any consuming components
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAgent: currentUser?.role === 'agent',
    login,
    loginAsAgent,
    logout,
    register,
    registerAsAgent
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;