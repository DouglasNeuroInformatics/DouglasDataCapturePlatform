import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation('login');

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmitLogin: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    alert('Not Implemented!');
  };

  return (
    <div className="h-screen">
      <div className="container flex h-full max-w-md flex-col items-center justify-center">
        <div className="flex justify-center">
          <img alt="logo" className="w-20 p-3" src="/logo.png" />
        </div>
        <form className="border-2" onSubmit={handleSubmitLogin}>
          <div className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={credentials.username}
              onChange={(event) =>
                setCredentials((prevCredentials) => ({ ...prevCredentials, username: event.target.value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username">Password</label>
            <input id="username" name="username" type="password" value={credentials.password} />
          </div>
          <button className="rounded-full bg-cyan-500 px-4 py-2 font-semibold text-white shadow-sm" type="submit">
            {t('loginBtn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
