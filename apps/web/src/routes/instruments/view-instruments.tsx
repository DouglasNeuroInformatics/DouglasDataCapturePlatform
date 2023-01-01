import React from 'react';

import { InstrumentGetResponseDto } from '@dnp/common';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';

import API from '@/api';

const viewInstrumentsLoader: LoaderFunction = (): Promise<InstrumentGetResponseDto[]> => {
  return API.getInstruments(); // Change to request only the details necessary for all
};

const ViewInstrumentsPage = () => {
  const instruments = useLoaderData() as InstrumentGetResponseDto[]; // Validate at runtime a good idea?
  return (
    <div>
      <h1 className="text-center">View Instruments</h1>
      {instruments.map((instrument, i) => (
        <div className="card my-5" key={i}>
          <h3>{ instrument.title }</h3>
          <p>{instrument.description}</p>
          <Link className="btn-primary" to={`/instruments/${instrument._id}`}>Start</Link>
        </div>
      ))}
    </div>
  );
};

export { ViewInstrumentsPage as default, viewInstrumentsLoader };
