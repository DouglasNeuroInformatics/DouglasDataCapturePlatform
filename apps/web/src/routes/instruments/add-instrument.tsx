import React from 'react';

import { InstrumentDto, instrumentDtoSchema } from '@dnp/common';
import { ValidationError } from 'joi';
import { type ActionFunction, Form, redirect,  useActionData } from 'react-router-dom';

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
  console.log(validationError);

  if (validationError) {
    console.log(validationError.details)
  }
  
  return (
    <div>
      <h1>Add a New Instrument</h1>
      <Form method="post">
        <input name="title" placeholder="title" type="text" />

        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export { AddInstrumentPage as default, addInstrumentAction };
