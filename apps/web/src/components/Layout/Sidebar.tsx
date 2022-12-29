import React from 'react';

import { useTranslation } from 'react-i18next';
import { HiEye, HiFaceSmile, HiHome, HiPlus, HiUserPlus } from 'react-icons/hi2';

import SidebarLink from './SidebarLink';
import UserDropdown from './UserDropdown';

const Sidebar = () => {
  const { t } = useTranslation('common');
  return (
    <div className="flex h-screen w-72 flex-col bg-slate-900 p-3 text-slate-300">
      <div className="flex items-center p-3">
        <img alt="logo" className="mr-2 w-16" src="/logo.png" />
        <h3 className="uppercase leading-tight antialiased" style={{ maxWidth: '7.5em' }}>
          {t('platformTitle')}
        </h3>
      </div>
      <hr />
      <nav className="mb-auto p-3">
        <SidebarLink Icon={HiHome} to="/" />
        <SidebarLink Icon={HiUserPlus} to="/add-subject" />
        <SidebarLink Icon={HiEye} to="/view-subjects" />
        <SidebarLink Icon={HiPlus} to="/add-instrument" />
        <SidebarLink Icon={HiFaceSmile} to="/happiness-scale" />
      </nav>
      <hr className="block" />
      <div className="p-3">
        <UserDropdown />
      </div>
    </div>
  );
};

export default Sidebar;
