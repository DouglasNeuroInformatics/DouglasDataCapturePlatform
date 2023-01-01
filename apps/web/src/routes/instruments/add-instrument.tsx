import React from 'react';

import { InstrumentDto, instrumentDtoSchema } from '@dnp/common';
import { ValidationError } from 'joi';
import { type ActionFunction, redirect } from 'react-router-dom';

import Form from '@/components/Form';
import PageHeading from '@/components/PageHeading';

const addInstrumentAction: ActionFunction = async ({ request }) => {
  let dto: InstrumentDto;
  try {
    dto = await instrumentDtoSchema.validateAsync(await request.formData(), {
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
      <PageHeading>Add Instrument</PageHeading>
      <Form>
        <Form.TextField label="title" name="title" />
        <Form.SubmitButton label="Submit" />
      </Form>
    </div>
  );
};

export { AddInstrumentPage as default, addInstrumentAction };
