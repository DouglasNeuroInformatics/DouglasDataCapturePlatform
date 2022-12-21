import { createContext, type Dispatch, type SetStateAction } from 'react';

type AuthToken = string | null;

interface IAuthContext {
  authToken: AuthToken;
  setAuthToken: Dispatch<SetStateAction<AuthToken>>;
}

const AuthContext = createContext<IAuthContext>({
  authToken: null,
  setAuthToken: () => null
});

export { AuthContext as default, type AuthToken, type IAuthContext };
