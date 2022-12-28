import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';

import AuthToken from '../utils/AuthToken';

interface IAuthContext {
  token: AuthToken | null;
  setToken: Dispatch<SetStateAction<AuthToken | null>>;
  currentUser: string | null;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: () => null,
  currentUser: null
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<AuthToken | null>(null);
  const currentUser = null;
  return <AuthContext.Provider value={{ token, setToken, currentUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext as default, AuthContextProvider, type IAuthContext };
