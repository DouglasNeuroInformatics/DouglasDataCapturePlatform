import React, { useEffect } from 'react';

import { AuthRequestDto, authRequestSchema } from '@dnp/common';
import { ValidationError } from 'joi';
import { ActionFunction, useActionData } from 'react-router-dom';

import Form from '@/components/Form';
import useAuth from '@/hooks/useAuth';
import { parseRequestDto } from '@/utils';

const loginAction: ActionFunction = async ({ request }) => {
  return parseRequestDto(request, authRequestSchema);
};

const LoginPage = () => {
  const auth = useAuth();
  const actionData = useActionData() as AuthRequestDto | ValidationError | null | undefined;

  useEffect(() => {
    if (actionData && !(actionData instanceof Error)) {
      void auth.methods.login(actionData);
    }
  }, [actionData]);

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
