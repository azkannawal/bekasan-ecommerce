import { ReactNode } from 'react';

export interface AuthContextType {
  accessToken: string;
  refreshToken: string;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
};
