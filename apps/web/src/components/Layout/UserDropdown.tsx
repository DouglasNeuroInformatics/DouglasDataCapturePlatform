import React, { useContext } from 'react';

// import { useTranslation } from 'react-i18next';
import { HiUserCircle} from 'react-icons/hi2';
import { IoIosArrowUp } from 'react-icons/io';
import AuthContext from '@/store/AuthContext';

const UserDropdown = () => {
  const authContext = useContext(AuthContext);
  return (
    <div className="flex items-center">
      <HiUserCircle className="mr-2 h-8 w-8" />
      <span>{authContext.token?.payload?.username}</span>
      <IoIosArrowUp className="mx-1 hover:rotate-180" />
    </div>
  );
};

export default UserDropdown;
