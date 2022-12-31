import React, { useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { HiChevronRight, HiEye, HiHome, HiPlus, HiUserPlus } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';

import UserDropup from './UserDropup';

import useAuth from '@/hooks/useAuth';

const SidebarHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center">
      <img alt="logo" className="mr-2 w-16" src="/logo.png" />
      <h3 className="uppercase leading-tight antialiased" style={{ maxWidth: '7.5em' }}>
        {title}
      </h3>
    </div>
  );
};

const SidebarNav = ({ children }: { children: React.ReactNode }) => {
  return <nav className="mb-auto">{children}</nav>;
};

const SidebarNavLink = ({ Icon, label, to }: { Icon: IconType; label: string; to: string }) => {
  return (
    <NavLink className="flex items-center border p-2" to={to}>
      <Icon className="mr-1" />
      <span>{label}</span>
    </NavLink>
  );
};

const SidebarNavGroup = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => setIsToggled(!isToggled);
  return (
    <div className="border">
      <button className="flex w-full items-center p-2 hover:bg-slate-800" onClick={handleToggle}>
        <HiChevronRight
          className={classNames('transition-transform', 'duration-300', 'mr-1', { 'rotate-90': isToggled })}
        />
        <h1>{label}</h1>
      </button>
      <div className={classNames({ hidden: !isToggled })}>{children}</div>
    </div>
  );
};


const SidebarFooter = ({ username }: { username?: string }) => {
  return (
    <div className="flex items-center">
      <UserDropup username={username} />
    </div>
  );
};

const Sidebar = () => {
  const auth = useAuth();
  const { t } = useTranslation('common');

  return (
    <div className="flex h-full flex-col bg-slate-900 p-3 text-slate-300">
      <SidebarHeader title={t('platformTitle')} />
      <hr className="my-1" />
      <SidebarNav>
        <SidebarNavLink Icon={HiHome} label="Home" to="/home" />
        <SidebarNavLink Icon={HiUserPlus} label="Add Subject" to="subjects/add-subject" />
        {auth?.isAdmin && <SidebarNavLink Icon={HiEye} label="View Subjects" to="/subjects/view-subjects" />}
        {auth?.isAdmin && <SidebarNavLink Icon={HiPlus} label="Add Instrument" to="/instruments/add-instrument" />}
        {auth?.isAdmin && <SidebarNavLink Icon={HiEye} label="View Instruments" to="/instruments/view-instruments" />}
      </SidebarNav>
      <hr className="my-1" />
      <SidebarFooter username={auth?.username} />
    </div>
  );
};

export default Sidebar;
