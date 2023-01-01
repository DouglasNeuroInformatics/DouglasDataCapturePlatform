import React from 'react';

import classNames from 'classnames';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';

interface LinkProps extends RouterLinkProps {
  variant: 'btn';
}

const Link = ({ variant, ...props }: LinkProps) => {
  return <RouterLink className={classNames({ 'btn-primary': variant === 'btn' })} {...props}></RouterLink>;
};

export default Link;
