import React, { useContext, useState } from 'react';

import { AuthRequestDto } from '@dnp/common';
import { authRequestSchema } from '@dnp/common';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AuthApi from '@/api/api.auth.js';
import { ApiRequestError } from '@/api/api.base.js';
import Button from '@/components/Button.js';
import Modal from '@/components/Modal';
import AuthContext from '@/store/AuthContext.js';
import AuthToken from '@/utils/AuthToken.js';

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation('login');

  const { register, handleSubmit, formState } = useForm<AuthRequestDto>({
    resolver: joiResolver(authRequestSchema)
  });

  const onSubmit: SubmitHandler<AuthRequestDto> = (credentials) => {
    AuthApi.requestToken(credentials)
      .then((dto) => {
        authContext.setToken(new AuthToken(dto.accessToken));
        navigate('/');
      })
      .catch((error: ApiRequestError) => {
        alert(error.message);
      });
  };

  return (
    <div className="h-screen">
      <Modal isOpen={false} message={errorMessage} title="Error" />
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
