import { useContext } from 'react';

import AuthContext from '@/store/AuthContext';

export default function useAuth() {
  return useContext(AuthContext);
}
