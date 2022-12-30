import { InstrumentFieldType } from './instruments.enums';

export interface InstrumentField {
  name: string;
  label: string;
  isRequired: boolean;
  type: InstrumentFieldType;
}
