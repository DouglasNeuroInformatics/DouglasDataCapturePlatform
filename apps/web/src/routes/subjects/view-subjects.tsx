import React from 'react';

import { SubjectDto } from '@dnp/common';
import { type LoaderFunction, useLoaderData } from 'react-router-dom';

import API from '@/api';
import PageHeading from '@/components/PageHeading';

const viewSubjectsLoader: LoaderFunction = (): Promise<SubjectDto[]> => {
  return API.getSubjects();
};

const ViewSubjectsPage = () => {
  const subjects = useLoaderData() as SubjectDto[];
  return (
    <div className="flex flex-col items-center">
      <PageHeading>View Subjects</PageHeading>
      <table>
        <thead>
          <tr className="border-b">
            <th>Subject ID</th>
            <th>Date of Birth</th>
            <th>Sex</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(
            (
              subject,
              i // later key should be ID
            ) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{subject.dateOfBirth.toISOString()}</td>
                <td>{subject.sex}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export { ViewSubjectsPage as default, viewSubjectsLoader };
