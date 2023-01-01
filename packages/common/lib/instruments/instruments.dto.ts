import { InstrumentField } from './instruments.interfaces';

export interface BaseInstrumentDto {
  title: string;
  description: string;
  instructions: string;
  fields: InstrumentField[];
}

export type InstrumentGetResponseDto = BaseInstrumentDto

export type InstrumentPostRequestDto = BaseInstrumentDto;

export type InstrumentPostResponseDto = BaseInstrumentDto;