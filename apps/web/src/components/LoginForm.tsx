import React from 'react';

import API from '../api/index.js';

const LoginForm = () => {
  const handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    API.login().then(() => alert('Submit')).catch((error) => console.error(error))
  }

  console.log(import.meta.env.VITE_API_URL)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
      </div>
      <div>
        <label htmlFor="username">Password</label>
        <input id="username" name="username" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
