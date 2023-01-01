import React from 'react';

import { InstrumentGetResponseDto } from '@dnp/common';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import API from '@/api';
import Stepper from '@/components/Stepper';

const instrumentPageLoader: LoaderFunction = async ({ params }) => {
  return API.getInstrumentById(params.id);
};

const InstrumentOverview = ({ description, instructions }: { description: string; instructions: string }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="mt-5 text-xl font-bold">Description</h3>
      <p>{description}</p>
      <h3 className="mt-5 text-xl font-bold">Instructions</h3>
      <p>{instructions}</p>
    </div>
  );
};

const InstrumentPage = () => {
  const instrument = useLoaderData() as InstrumentGetResponseDto;
  return (
    <div>
      <h1 className="mb-5 text-center">{instrument.title}</h1>
      <div className="card">
        <Stepper
          steps={[
            {
              name: 'Overview',
              element: (
                <InstrumentOverview description={instrument.description} instructions={instrument.instructions} />
              )
            },
            {
              name: 'Bar',
              element: <h1>Foo Bar</h1>
            }
          ]}
        />
      </div>
    </div>
  );
};

export { InstrumentPage as default, instrumentPageLoader };
