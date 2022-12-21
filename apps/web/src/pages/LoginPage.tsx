import React, { useContext } from 'react';

import { AuthRequestDto } from '@dnp/common/dto';
import { authRequestSchema } from '@dnp/common/schemas';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi.js';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AuthAPI from '../api/api.auth.js';
import Button from '../components/Button.js';
import AuthContext from '../store/AuthContext.js';

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation('login');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthRequestDto>({
    resolver: joiResolver(authRequestSchema)
  });

  const onSubmit: SubmitHandler<AuthRequestDto> = async (credentials) => {
    const token = await AuthAPI.requestToken(credentials);
    if (token) {
      authContext.setAuthToken(token);
      navigate('/');
      window.sessionStorage.setItem('token', token)
    } else {
      alert('Failed to obtain token with credentials');
    }
  };

  return (
    <div className="h-screen">
      <div className="container flex h-full max-w-md flex-col items-center justify-center">
        <div className="flex justify-center">
          <img alt="logo" className="w-20 p-3" src="/logo.png" />
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input className="my-2 border-2 p-2" placeholder="username" {...register('username')} type="text" />
          {errors.username && <span>{errors.username.message}</span>}
          <input className="my-2 border-2 p-2" placeholder="password" {...register('password')} type="password" />
          {errors.password && <span>{errors.password.message}</span>}
          <Button type="submit">{t('loginBtn')}</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
