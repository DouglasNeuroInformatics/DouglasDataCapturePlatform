import React, { useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { HiChevronRight, HiEye, HiHome, HiPlus, HiUserPlus } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

import UserDropup from './UserDropup';

import useAuth from '@/hooks/useAuth';

const SidebarNavLink = ({ Icon, label, to }: { Icon: IconType; label: string; to: string }) => {
  return (
    <NavLink className="flex items-center border p-2" to={to}>
      <Icon className="mr-1" />
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const auth = useAuth();
  const { t } = useTranslation('common');

  return (
    <div className="flex h-full flex-col bg-slate-900 p-3 text-slate-300">
      <div className="flex items-center p-2">
        <img alt="logo" className="mr-2 w-16" src="/logo.png" />
        <h3 className="uppercase leading-tight antialiased" style={{ maxWidth: '7.5em' }}>
          {t('platformTitle')}
        </h3>
      </div>
      <hr className="my-1" />
      <nav className="mb-auto">
        <SidebarNavLink Icon={HiHome} label="Home" to="/home" />
        <SidebarNavLink Icon={HiUserPlus} label="Add Subject" to="subjects/add-subject" />
        {auth?.isAdmin && <SidebarNavLink Icon={HiEye} label="View Subjects" to="/subjects/view-subjects" />}
        {auth?.isAdmin && <SidebarNavLink Icon={HiPlus} label="Add Instrument" to="/instruments/add-instrument" />}
        {auth?.isAdmin && <SidebarNavLink Icon={HiEye} label="View Instruments" to="/instruments/view-instruments" />}
      </nav>
      <hr className="my-1" />
      <div className="flex items-center">
        <UserDropup username={auth?.username} />
      </div>
    </div>
  );
};

export default Sidebar;
