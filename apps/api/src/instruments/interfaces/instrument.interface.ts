import { InstrumentFieldInterface } from './instrument-field.interface';

export interface InstrumentInterface {
  name: string;
  description: string;
  instructions: string;
  estimatedDuration: number;
  fields: InstrumentFieldInterface[];
}