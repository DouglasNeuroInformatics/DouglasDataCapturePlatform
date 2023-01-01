import React from 'react';

import { InstrumentPostRequestDto, instrumentPostRequestSchema } from '@dnp/common';
import { ValidationError } from 'joi';
import { type ActionFunction, redirect } from 'react-router-dom';

import Form from '@/components/Form';

const addInstrumentAction: ActionFunction = async ({ request }) => {
  let dto: InstrumentPostRequestDto;
  try {
    dto = await instrumentPostRequestSchema.validateAsync(await request.formData(), {
      abortEarly: false
    });
    alert(JSON.stringify(dto));
  } catch (error) {
    if (error instanceof ValidationError) {
      return error;
    }
    throw error;
  }
  return redirect('/home');
};

const AddInstrumentPage = () => {
  return (
    <div>
      <h1>Add Instrument</h1>
      <Form>
        <Form.TextField label="title" name="title" />
        <Form.SubmitButton label="Submit" />
      </Form>
    </div>
  );
};

export { AddInstrumentPage as default, addInstrumentAction };
