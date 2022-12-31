import { useContext, useMemo } from 'react';

import { AuthRequestDto, AuthTokenPayload, UserRole, authTokenPayloadSchema } from '@dnp/common';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import API from '@/api';
import AuthContext, { AuthContextInterface } from '@/context/AuthContext';

interface CurrentUser {
  username: string;
  role: UserRole;
  isAdmin: boolean;
}

interface Methods {
  login: (credentials: AuthRequestDto) => Promise<void>;
  loginDev: () => Promise<void>;
  logout: () => void;
}

interface Auth {
  currentUser: CurrentUser | null;
  methods: Methods;
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

export default function useAuth(): Auth {
  const authContext = useContext(AuthContext) as AuthContextInterface;
  const navigate = useNavigate();

  const tokenPayload = authContext.token ? extractTokenPayload(authContext.token) : null;

  const currentUser = tokenPayload
    ? {
        username: tokenPayload.username,
        role: tokenPayload.role,
        isAdmin: tokenPayload.role === 'admin'
      }
    : null;

  const methods = useMemo(
    () => ({
      login: async (credentials: AuthRequestDto) => {
        try {
          const { accessToken } = await API.requestToken(credentials);
          authContext.setToken(accessToken);
          navigate('/home');
        } catch (error) {
          if (error instanceof Response && error.status === 401) {
            alert('Invalid login credentials. Please try again!');
          } else {
            alert('An unexpected error occurred!');
          }
        }
      },
      loginDev: async () => {
        const credentials = {
          username: import.meta.env.VITE_DEV_USERNAME,
          password: import.meta.env.VITE_DEV_PASSWORD
        };
        if (credentials.username && credentials.password) {
          const { accessToken } = await API.requestToken(credentials as AuthRequestDto);
          authContext.setToken(accessToken);
          navigate('/home');
        } else {
          alert('Failed to automatically login to development database!');
        }
      },
      logout: () => authContext.setToken(null)
    }),
    []
  );

  return {
    currentUser: currentUser,
    methods: methods
  };
}
