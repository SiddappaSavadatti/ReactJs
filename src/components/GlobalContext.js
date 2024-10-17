import React, { createContext, useState } from 'react';

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // This can store your universal data

  // Example of a function to update user data globally
  const updateUserData = (newData) => {
    setUserData(newData);
  };

  return (
    <GlobalContext.Provider value={{ userData, updateUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
