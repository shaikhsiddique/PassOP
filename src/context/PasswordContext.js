import React, { createContext, useState, useContext, useEffect } from 'react';

const PasswordContext = createContext();

export const usePasswordContext = () => useContext(PasswordContext);

export const PasswordProvider = ({ children }) => {
  const [passwordArray, setPasswordArray] = useState([]);
  const [editingPassword, setEditingPassword] = useState(null);

  useEffect(() => {
    const existingData = localStorage.getItem("passwords");
    if (existingData) {
      try {
        const data = JSON.parse(existingData);
        setPasswordArray(data);
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error.message);
        localStorage.removeItem("passwords");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwordArray));
  }, [passwordArray]);

  const addPassword = (newPassword) => {
    setPasswordArray((prevArray) => [...prevArray, newPassword]);
  };

  const editPassword = (password) => {
    setEditingPassword(password);
  };

  const updatePassword = (updatedPassword) => {
    setPasswordArray((prevArray) =>
      prevArray.map((pass) =>
        pass.id === updatedPassword.id ? updatedPassword : pass
      )
    );
    setEditingPassword(null);
  };

  return React.createElement(PasswordContext.Provider, {
    value: { 
      passwordArray, 
      addPassword, 
      editPassword, 
      updatePassword, 
      editingPassword 
    },
    children: children
  });
};
