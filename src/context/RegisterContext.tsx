import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  setUserID: (id: string) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserID: () => {},
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

  const setUserID = (id: string) => {
    setUserId(id);
    localStorage.setItem("userId", id);
  };

  const clearUser = () => {
    setUserId(null);
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider value={{ userId, setUserID, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
