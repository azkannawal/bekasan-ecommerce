import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  username: string | null;
  setUserData: (id: string, username: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  username: null,
  setUserData: () => {},
  clearUser: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const setUserData = (id: string, username: string) => {
    localStorage.setItem("userId", id);
    localStorage.setItem("username", username);
    setUserId(id);
    setUsername(username);
  };

  const clearUser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setUserId(null);
    setUsername(null);
  };

  return (
    <UserContext.Provider value={{ userId, username, setUserData, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
