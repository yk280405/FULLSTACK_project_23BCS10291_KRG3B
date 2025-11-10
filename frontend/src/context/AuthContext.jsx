import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
// This is what components will use to consume the context
const AuthContext = createContext(null);

// 2. Create the Provider Component
// This component will wrap our app and manage the state
export const AuthProvider = ({ children }) => {
  // We'll store the user object in state. null means logged out.
  const [user, setUser] = useState(null);

  // login function: sets the user in state
  // In a real app, this would be called after a successful API login
  const login = (userData) => {
    setUser(userData);
    // You could also save to localStorage here
  };

  // logout function: clears the user from state
  const logout = () => {
    setUser(null);
    // Also remove from localStorage
  };

  // The 'value' object is what all consuming components will receive.
  // We include the user's state, the login/logout functions,
  // and a handy boolean 'isLoggedIn'.
  const value = {
    user,
    login,
    logout,
    isLoggedIn: !!user // true if user is not null, false if user is null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom "hook"
// This makes it easy for components to get the context data
// Instead of importing AuthContext and useContext, they can just call useAuth()
export const useAuth = () => {
  return useContext(AuthContext);
};