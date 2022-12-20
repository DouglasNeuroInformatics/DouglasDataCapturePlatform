import React from 'react';

import { useTranslation } from 'react-i18next';

import Layout from '../components/Layout.js';


const LoginPage = () => {
  const { t } = useTranslation();
  
  const handleSubmitLogin: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    alert('Not Implemented!');
  };

  return (
    <Layout>
      <h1>Login Page</h1>
      <form className="border-2" onSubmit={handleSubmitLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" />
        </div>
        <div>
          <label htmlFor="username">Password</label>
          <input id="username" name="username" type="password" />
        </div>
        <button className="bg-slate-500" type="submit">
          Login
        </button>
      </form>
    </Layout>
  );
};

export default LoginPage;
