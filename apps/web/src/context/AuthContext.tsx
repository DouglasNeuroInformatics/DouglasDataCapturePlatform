import React, { createContext, useEffect, useState } from 'react';

import API from '@/api';

interface AuthContextInterface {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextInterface>({
  token: null,
  setToken: () => null
});

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const credentials = {
        username: import.meta.env.VITE_ADMIN_USERNAME as string,
        password: import.meta.env.VITE_ADMIN_PASSWORD as string
      };
      API.requestToken(credentials)
        .then((dto) => setToken(dto.accessToken))
        .catch(() => alert('Failed to automatically login to development database!'));
    }
  }, []);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext as default, AuthContextProvider, type AuthContextInterface };
