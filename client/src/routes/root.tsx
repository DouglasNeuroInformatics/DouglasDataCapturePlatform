import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import Layout from '@/components/Layout';
import useAuth from '@/hooks/useAccessToken';

function rootLoader() {
  console.log('loading root!');
  return null;
}

const Root = () => {
  const auth = useAuth();

  return auth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export { Root as default, rootLoader };