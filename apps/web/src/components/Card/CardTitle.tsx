import React from 'react';

const CardTitle = ({ children }: { children: string }) => {
  return <h2 className="text-3xl font-semibold text-gray-800">{children}</h2>;
};

export default CardTitle;
