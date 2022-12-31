import React from 'react';

import { InstrumentDto, instrumentDtoSchema } from '@dnp/common';
import { ValidationError } from 'joi';
import { type ActionFunction, redirect, useActionData } from 'react-router-dom';

import Form from '@/components/Form';

const addInstrumentAction: ActionFunction = async ({ request }) => {
  let dto: InstrumentDto;
  try {
    dto = await instrumentDtoSchema.validateAsync(await request.formData(), {
      abortEarly: false
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return error;
    }
    throw error;
  }
  return redirect('/home');
};

const AddInstrumentPage = () => {
  const validationError = useActionData() as ValidationError | undefined;

  return (
    <div>
      <h1>Add a New Instrument</h1>
      <Form>
        <Form.TextField label="title" name="title" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export { AddInstrumentPage as default, addInstrumentAction };
