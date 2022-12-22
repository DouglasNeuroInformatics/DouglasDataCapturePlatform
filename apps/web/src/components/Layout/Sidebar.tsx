import React from 'react';

import { useTranslation } from 'react-i18next';
import { HiHome, HiUserPlus, HiEye, HiPlus, HiFaceSmile } from 'react-icons/hi2';

import SidebarLink from './SidebarLink.js';
import UserDropdown from './UserDropdown.js';

const Sidebar = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex h-screen w-72 flex-col bg-slate-900 p-3 text-slate-300">
      <div className="flex items-center p-3">
        <img alt="logo" className="w-16 mr-2" src="/logo.png" />
        <h3 className="uppercase leading-tight antialiased" style={{ maxWidth: '7.5em' }}>
          {t('platformTitle')}
        </h3>
      </div>
      <hr />
      <nav className="mb-auto block">
        <SidebarLink Icon={HiHome} to="/" />
        <SidebarLink Icon={HiUserPlus} to="/add-subject" />
        <SidebarLink Icon={HiEye} to="/view-subjects" />
        <SidebarLink Icon={HiPlus} to="/add-instrument" />
        <SidebarLink Icon={HiFaceSmile} to="/happiness-scale" />
      </nav>
      <hr className="block" />
      <UserDropdown />
    </div>
  );
};

export default Sidebar;
