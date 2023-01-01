import React from 'react';

import { InstrumentGetResponseDto } from '@dnp/common';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import API from '@/api';
import Button from '@/components/Button';
import Link from '@/components/Link';

const instrumentPageLoader: LoaderFunction = async ({ params }) => {
  return API.getInstrumentById(params.id);
};

const InstrumentPage = () => {
  const instrument = useLoaderData() as InstrumentGetResponseDto;
  const navigate = useNavigate();
  console.log(instrument);

  return (
    <div>
      <h1 className="mt-5 text-center text-3xl">{instrument.title}</h1>
      <h3 className="mt-5 text-xl font-bold">Description</h3>
      <p>{instrument.description}</p>
      <h3 className="mt-5 text-xl font-bold">Instructions</h3>
      <p>{instrument.instructions}</p>
      <Button type="button" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Button type="button">Begin</Button>
    </div>
  );
};

export { InstrumentPage as default, instrumentPageLoader };
