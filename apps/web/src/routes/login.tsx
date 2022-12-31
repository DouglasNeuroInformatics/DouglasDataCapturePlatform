import React, { useContext, useEffect } from 'react';

import { AuthRequestDto, AuthResponseDto, authRequestSchema } from '@dnp/common';
import { ValidationError } from 'joi';
import { ActionFunction, useActionData, useNavigate } from 'react-router-dom';

import API from '@/api';
import Form from '@/components/Form';
import AuthContext from '@/context/AuthContext';

const loginAction: ActionFunction = async ({ request }) => {
  const data = Object.fromEntries(await request.formData());
  let requestDto: AuthRequestDto;
  let responseDto: AuthResponseDto;
  try {
    requestDto = await authRequestSchema.validateAsync(data);
    responseDto = await API.requestToken(requestDto);
  } catch (error) {
    if (error instanceof ValidationError) {
      return error;
    }
    throw error;
  }
  return responseDto.accessToken;
};

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const actionData = useActionData() as string | null | undefined | ValidationError;

  const isLoggedIn = actionData && !(actionData instanceof Error);

  useEffect(() => {
    if (isLoggedIn) {
      authContext.setToken(actionData);
      navigate('/home');
    }
  }, [isLoggedIn]);

  return (
    <div className="h-screen">
      <div className="container flex h-full flex-col items-center justify-center">
        <h1>Login</h1>
        <Form>
          <Form.TextField label="username" name="username" />
          <Form.TextField label="password" name="password" variant="password" />
          <Form.SubmitButton label="Login" />
        </Form>
      </div>
    </div>
  );
};

export { LoginPage as default, loginAction };
