import { InstrumentFieldType } from './instruments.enums';

export interface InstrumentFieldInterface {
  name: string;
  label: string;
  isRequired: boolean;
  type: InstrumentFieldType;
}

export interface InstrumentInterface {
  title: string;
  description: string;
  instructions: string;
  fields: InstrumentFieldInterface[];
}
