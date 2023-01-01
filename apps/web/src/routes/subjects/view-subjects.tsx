import React from 'react';

import { SubjectGetResponseDto } from '@dnp/common';
import { type LoaderFunction, useLoaderData } from 'react-router-dom';

import API from '@/api';

const viewSubjectsLoader: LoaderFunction = (): Promise<SubjectGetResponseDto[]> => {
  return API.getSubjects();
};

const ViewSubjectsPage = () => {
  const subjects = useLoaderData() as SubjectGetResponseDto[];
  return (
    <div className="flex flex-col items-center">
      <h1>View Subjects</h1>
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
