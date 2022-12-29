import React from 'react';

import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

interface SidebarLinkProps {
  Icon: IconType;
  to: string;
}

const SidebarLink = ({ Icon, to }: SidebarLinkProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'sidebarLinks' });
  return (
    <NavLink className="flex items-center py-1 hover:bg-slate-800 hover:text-slate-200" to={to}>
      <Icon className="mr-2 h-6 w-6" />
      <span>
        <span>{t(to)}</span>
      </span>
    </NavLink>
  );
};

export default SidebarLink;
