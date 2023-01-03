import { Instrument } from '@/instruments/schemas/instrument.schema';

export const getInstrumentStub = (): Instrument => ({
  title: 'Happiness Questionnaire',
  description: 'An instrument to measure happiness',
  instructions: 'Please complete the following question',
  fields: [
    {
      name: 'score',
      label: 'Happiness Score',
      isRequired: true,
      type: 'string'
    }
  ]
});
