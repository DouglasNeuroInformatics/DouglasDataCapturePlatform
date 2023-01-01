import { InstrumentField } from './instruments.interfaces';

export interface BaseInstrumentDto {
  title: string;
  description: string;
  instructions: string;
  fields: InstrumentField[];
}

export interface InstrumentGetResponseDto extends BaseInstrumentDto {
  _id: string;
}

export type InstrumentPostRequestDto = BaseInstrumentDto;

export interface InstrumentPostResponseDto extends BaseInstrumentDto {
  _id: string;
}
