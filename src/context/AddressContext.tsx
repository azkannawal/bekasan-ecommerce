import React, { createContext, useContext, useState } from "react";

interface Address {
  address: string,
  longitude: number;
  latitude: number;
}

interface UserContextType {
  user: Address | null;
  setUser: React.Dispatch<React.SetStateAction<Address | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const addressUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("addressUser must be used within a AddressProvider");
  }
  return context;
};

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Address | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
