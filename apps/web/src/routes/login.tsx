import React, { useContext } from 'react';

import { AuthRequestDto, authRequestSchema } from '@dnp/common';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

import API, { APIRequestError } from '@/api';
import Button from '@/components/Button.js';
import AuthContext from '@/context/AuthContext.js';

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation('login');

  const { register, handleSubmit, formState } = useForm<AuthRequestDto>({
    resolver: joiResolver(authRequestSchema)
  });

  const onSubmit: SubmitHandler<AuthRequestDto> = (credentials) => {
    API.requestToken(credentials)
      .then((dto) => {
        authContext?.setToken(dto.accessToken);
        navigate('/home');
      })
      .catch((error: APIRequestError) => {
        alert(error.message);
      });
  };

  if (authContext.token) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="h-screen">
      <div className="container flex h-full max-w-md flex-col items-center justify-center">
        <div className="flex justify-center">
          <img alt="logo" className="w-20 p-3" src="/logo.png" />
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input className="my-2 border-2 p-2" placeholder="username" {...register('username')} type="text" />
          {formState.errors.username && <span>{formState.errors.username.message}</span>}
          <input className="my-2 border-2 p-2" placeholder="password" {...register('password')} type="password" />
          {formState.errors.password && <span>{formState.errors.password.message}</span>}
          <Button type="submit">{t('loginBtn')}</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;