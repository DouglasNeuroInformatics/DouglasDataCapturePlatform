import React, { createContext, useState, type Dispatch, type SetStateAction } from 'react';

import jwtDecode from 'jwt-decode';

type AuthToken = string | null;

interface IAuthContext {
  token: AuthToken;
  setToken: Dispatch<SetStateAction<AuthToken>>;
  currentUser: string | null;
}

const AuthContext = createContext<IAuthContext>({
  token: null,
  setToken: () => null,
  currentUser: null
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<AuthToken>(null);
  const currentUser = token ? jwtDecode(token) : null;
  console.log('currentUser', currentUser);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext as default, AuthContextProvider, type AuthToken, type IAuthContext };
