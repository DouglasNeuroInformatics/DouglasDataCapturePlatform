import React, { createContext, useState } from 'react';

type AuthToken = string | null;

type LoginHandler = (token: string) => void;

type LogoutHandler = () => void;

interface IAuthContext {
  authToken: AuthToken;
  loginHandler: LoginHandler;
  logoutHandler: LogoutHandler;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<AuthToken>(null);

  const loginHandler: LoginHandler = (token) => {
    setAuthToken(token);
  };

  const logoutHandler: LogoutHandler = () => setAuthToken(null);

  const contextValue: IAuthContext = {
    authToken: authToken,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthContextProvider };
export type { AuthToken, LoginHandler, LogoutHandler, IAuthContext };
