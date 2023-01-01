import React from 'react';

import { Sex, subjectPostRequestSchema } from '@dnp/common';
import { type ActionFunction } from 'react-router-dom';

import API from '@/api';
import Form from '@/components/Form';
import PageHeading from '@/components/PageHeading';
import { formatOptions, parseRequestDto } from '@/utils';

const addSubjectAction: ActionFunction = async ({ request }) => {
  const obj = await parseRequestDto(request, subjectPostRequestSchema);
  if (obj instanceof Error) {
    console.log(obj);
    return obj;
  }
  return API.addSubject(obj);
};

const AddSubjectPage = () => {
  return (
    <div className="flex flex-col items-center">
      <PageHeading>Add Subject</PageHeading>
      <Form>
        <Form.TextField label="First Name" name="firstName" />
        <Form.TextField label="Last Name" name="lastName" />
        <Form.SelectField label="Sex" name="sex" options={formatOptions(Sex)} />
        <Form.DateField name="dateOfBirth" />
        <Form.SubmitButton />
      </Form>
    </div>
  );
};

export { AddSubjectPage as default, addSubjectAction };
