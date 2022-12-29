import React, { type Dispatch, type SetStateAction, createContext, useState } from 'react';

import AuthToken from '@/utils/AuthToken';

interface IAuthContext {
  token: AuthToken | null;
  setToken: Dispatch<SetStateAction<AuthToken | null>>;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: () => null
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<AuthToken | null>(null);
  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext as default, AuthContextProvider, type IAuthContext };
