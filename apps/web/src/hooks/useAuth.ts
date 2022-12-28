import { useContext } from 'react';

import AuthContext from '../store/AuthContext.js';

export default function useAuth() {
  return useContext(AuthContext);
}
