import React from 'react';

import { InstrumentGetResponseDto } from '@dnp/common';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

import API from '@/api';
import Card from '@/components/Card';
import PageHeading from '@/components/PageHeading';

const viewInstrumentsLoader: LoaderFunction = (): Promise<InstrumentGetResponseDto[]> => {
  return API.getInstruments();
};

const ViewInstrumentsPage = () => {
  const instruments = useLoaderData() as InstrumentGetResponseDto[]; // Validate at runtime a good idea?
  return (
    <div>
      <PageHeading>View Instruments</PageHeading>
      {instruments.map((instrument, i) => (
        <Card className="my-5" key={i}>
          <Card.Title>{instrument.title}</Card.Title>
          <Card.Text>{instrument.description}</Card.Text>
          <Card.Link to={`/instruments/${instrument._id}`}>Begin</Card.Link>
        </Card>
      ))}
    </div>
  );
};

export { ViewInstrumentsPage as default, viewInstrumentsLoader };
