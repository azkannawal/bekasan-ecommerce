import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  userId: string | null;
  username: string | null;
  setUserData: (id: string, username: string) => void;
  clearUser: () => void;
};

type Props = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType>({
  userId: null,
  username: null,
  setUserData: () => {},
  clearUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: Props) => {
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
