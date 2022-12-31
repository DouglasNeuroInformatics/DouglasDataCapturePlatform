import React from 'react';

import { subjectDtoSchema } from '@dnp/common';
import { type ActionFunction, redirect } from 'react-router-dom';

import API from '@/api';
import Form from '@/components/Form';
import PageHeading from '@/components/PageHeading';

const addSubjectAction: ActionFunction = async ({ request }) => {
  return null
}

const AddSubjectPage = () => {
  return (
    <div>
      <PageHeading>Add Subject</PageHeading>
    </div>
  )
}

export { AddSubjectPage as default, addSubjectAction };
  
/*
const addSubjectAction: ActionFunction = async ({ request }) => {
  const { value, error } = subjectDtoSchema.validate(Object.fromEntries(await request.formData()), {
    abortEarly: false
  });
  if (value) {
    await API.addSubject(value);
  }
  const errorMessages = error?.details.map((item) => item.message) as string[];
  alert(JSON.stringify(errorMessages));
  return redirect('/');
  // const errorMessages = error?.details.map((item) => item.message);
  // const data = API.addSubject(Object.fromEntries(formData));
};

const AddSubjectPage = () => {
  return (
    <div>
      <h1>Add a Subject</h1>
      <Form method="post">
        <input name="firstName" placeholder="First Name" type="text" />
        <input name="lastName" placeholder="Last Name" type="text" />
        <input name="sex" placeholder="Sex" type="text" />
        <input name="dateOfBirth" placeholder="Date of Birth" type="date" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export { AddSubjectPage as default, addSubjectAction };
*/