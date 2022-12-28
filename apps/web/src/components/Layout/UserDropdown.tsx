import React, { useContext } from 'react';

// import { useTranslation } from 'react-i18next';
import { HiUserCircle } from 'react-icons/hi2';

import AuthContext from '../../store/AuthContext.js';

const UserDropdown = () => {
  const authContext = useContext(AuthContext);

  //const { t } = useTranslation('common');
  console.log(authContext);

  return (
    <div>
      <HiUserCircle className="h-8 w-8" />
      <span>{authContext.currentUser?.toString}</span>
    </div>
  );
};

export default UserDropdown;
