import React, { useState } from 'react';

import { AuthLoginRequestDto } from '@dnp/common/dto';
import { classValidatorResolver } from '@hookform/resolvers/class-validator/dist/class-validator.js';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthAPI } from '../api/auth-api.js';
import Button from '../components/Button.js';

const LoginPage = () => {
  const { t } = useTranslation('login');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthLoginRequestDto>({
    resolver: classValidatorResolver(AuthLoginRequestDto)
  });

  const onSubmit: SubmitHandler<AuthLoginRequestDto> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="h-screen">
      <div className="container flex h-full max-w-md flex-col items-center justify-center">
        <div className="flex justify-center">
          <img alt="logo" className="w-20 p-3" src="/logo.png" />
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="username" {...register('username')} type="text" />
          <input placeholder="password" {...register('password')} type="password" />
          <Button type="submit">{t('loginBtn')}</Button>
          {errors.username && <span>This field is required</span>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
