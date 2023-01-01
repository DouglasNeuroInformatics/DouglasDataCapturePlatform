import React from 'react';

import { Link } from 'react-router-dom';

interface CardLinkProps {
  children: string;
  to: string;
}

const CardLink = ({ children, to }: CardLinkProps) => {
  return (
    <Link className="w-20 rounded-lg bg-indigo-500 p-2 text-center font-medium text-white" to={to}>
      {children}
    </Link>
  );
};

export { CardLink as default, type CardLinkProps };
