import React from 'react';

import { InstrumentField, InstrumentGetResponseDto } from '@dnp/common';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

import API from '@/api';
import Form from '@/components/Form';
import Stepper from '@/components/Stepper';

const instrumentPageLoader: LoaderFunction = async ({ params }) => {
  return API.getInstrumentById(params.id);
};

const instrumentPageAction: LoaderFunction = async ({ request }) => {
  const obj = await request.formData();
  console.log(obj);
  return null;
};

const InstrumentOverview = ({ description, instructions }: { description: string; instructions: string }) => {
  return (
    <div>
      <h3 className="mt-5 text-xl font-bold">Description</h3>
      <p>{description}</p>
      <h3 className="mt-5 text-xl font-bold">Instructions</h3>
      <p>{instructions}</p>
    </div>
  );
};

const InstrumentForm = ({ fields }: { fields: InstrumentField[] }) => {
  console.log(fields);
  return (
    <Form>
      {fields.map((field, i) => {
        switch (field.type) {
          case 'string':
            return <Form.TextField key={i} label={field.label} name={field.name} />;
          case 'number':
            return 'Number';
          default:
            throw new Error(`Behavior for field of type ${field.type} is undefined!`);
        }
      })}
      <Form.SubmitButton />
    </Form>
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
              name: 'Questions',
              element: <InstrumentForm fields={instrument.fields} />
            }
          ]}
        />
      </div>
    </div>
  );
};

export { InstrumentPage as default, instrumentPageAction, instrumentPageLoader };
