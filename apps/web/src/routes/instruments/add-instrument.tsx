import React from 'react';

import { type ActionFunction, Form, redirect } from 'react-router-dom';

import { extractSchema } from '@/utils/form-utils';

const addInstrumentAction: ActionFunction = async ({ request, params }) => {
  const data = extractSchema(await request.formData(), instrum)
  console.log(data);
  return redirect('/home');
};

const AddInstrumentPage = () => {
  return (
    <div>
      <h1>Add a New Instrument</h1>
      <Form method="post">
        <input name="title" placeholder="name" type="text" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export { AddInstrumentPage as default, addInstrumentAction };
