import React from 'react';

const PageHeading = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="my-5 mb-3 text-center text-3xl">{children}</h1>;
};

export default PageHeading;
