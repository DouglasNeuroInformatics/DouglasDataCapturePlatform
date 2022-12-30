import React from 'react';

import { SubjectInterface } from '@dnp/common';
import { useLoaderData } from 'react-router-dom';

import API from '@/api';

function viewSubjectsLoader(): Promise<SubjectInterface[]> {
  return API.getSubjects();
}

const ViewSubjectsPage = () => {
  const subjects = useLoaderData() as SubjectInterface[];
  console.log('Subjects Loader Data', subjects);
  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-3 text-3xl">View Subjects</h1>
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
