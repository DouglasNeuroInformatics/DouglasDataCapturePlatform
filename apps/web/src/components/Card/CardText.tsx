import React from 'react';

const CardText = ({ children }: { children: string }) => {
  return <p className="my-2 text-gray-600">{children}</p>;
};

export default CardText;
