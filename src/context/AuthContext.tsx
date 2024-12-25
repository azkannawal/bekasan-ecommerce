import { createContext, useState } from "react";
import { AuthContextType, AuthProviderProps } from "@/models/AuthContext";

export const AuthContext = createContext<AuthContextType>({
  accessToken: "",
  refreshToken: "",
  setTokens: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>(
    localStorage.getItem("refreshToken") || ""
  );
  const setTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, setTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
