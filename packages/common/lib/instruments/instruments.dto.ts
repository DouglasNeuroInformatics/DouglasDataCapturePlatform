import { InstrumentField } from './instruments.interfaces';

export interface InstrumentDto {
  title: string;
  description: string;
  instructions: string;
  fields: InstrumentField[];
}
