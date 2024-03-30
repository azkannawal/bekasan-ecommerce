import { createContext, useContext, useState, ReactNode } from "react";

type Address = {
  address: string;
  longitude: number;
  latitude: number;
}

interface UserContextType {
  user: Address | null;
  setUser: React.Dispatch<React.SetStateAction<Address | null>>;
}

type Props = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const addressUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("addressUser must be used within a AddressProvider");
  }
  return context;
};

export const AddressProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Address | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
