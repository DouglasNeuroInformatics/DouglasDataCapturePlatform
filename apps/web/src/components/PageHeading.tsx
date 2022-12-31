import React from 'react';

const PageHeading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="mb-3 text-3xl">{children}</h1>;
};

export default PageHeading;
