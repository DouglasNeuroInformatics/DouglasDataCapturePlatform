import React, { type Dispatch, type SetStateAction, createContext, useEffect, useState } from 'react';

import AuthApi from '@/api/api.auth';
import AuthToken from '@/utils/AuthToken';

interface IAuthContext {
  token: AuthToken | null;
  setToken: Dispatch<SetStateAction<AuthToken | null>>;
  username?: string;
  isAdmin?: boolean;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: () => null
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<AuthToken | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const credentials = {
        username: import.meta.env.VITE_ADMIN_USERNAME as string,
        password: import.meta.env.VITE_ADMIN_PASSWORD as string
      };
      AuthApi.requestToken(credentials)
        .then((dto) => setToken(new AuthToken(dto.accessToken)))
        .catch(() => alert('Failed to automatically login to development database!'));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, setToken, isAdmin: token?.payload?.role === 'admin', username: token?.payload?.username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext as default, AuthContextProvider, type IAuthContext };
