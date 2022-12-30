import { useContext } from 'react';

import { AuthTokenPayload, UserRole, authTokenPayloadSchema } from '@dnp/common';
import jwtDecode from 'jwt-decode';

import AuthContext from '@/context/AuthContext';

interface Auth {
  username: string;
  role: UserRole;
  isAdmin: boolean;
}

const extractTokenPayload = (token: string): AuthTokenPayload | null => {
  const { value, error } = authTokenPayloadSchema.validate(jwtDecode(token), {
    allowUnknown: true
  });
  if (error) {
    console.error(error);
    return null;
  }
  return value;
};

export default function useAuth(): Auth | null {
  const authContext = useContext(AuthContext);
  const tokenPayload = authContext.token ? extractTokenPayload(authContext.token) : null;
  if (!tokenPayload) {
    return null;
  }
  const { username, role } = tokenPayload;
  const isAdmin = role === 'admin';
  return { username, role, isAdmin };
}
