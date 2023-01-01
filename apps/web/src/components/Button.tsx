import React from 'react';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: string;
  variant?: 'primary';
}

const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button className={`btn-${variant}`} {...props}>
      {children}
    </button>
  );
};

export { Button as default, type ButtonProps };
