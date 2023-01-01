import React from 'react';

import classNames from 'classnames';

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={classNames('flex flex-col rounded-lg bg-white py-4 px-8 shadow-lg', className)}>{children}</div>
  );
};

export default Card;
