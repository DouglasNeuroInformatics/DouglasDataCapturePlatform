import { InstrumentFieldType } from './instruments.enums';

export interface InstrumentField {
  name: string;
  description: string;
  isRequired: boolean;
  type: InstrumentFieldType;
}

export interface Instrument {
  title: string;
  description: string;
  fields: InstrumentField[];
}
