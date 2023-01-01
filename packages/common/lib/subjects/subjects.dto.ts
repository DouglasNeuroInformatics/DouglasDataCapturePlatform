import { Sex } from './subjects.enums';

export interface SubjectGetResponseDto {
  _id: string;
  dateOfBirth: Date;
  sex: Sex;
}

export interface SubjectPostRequestDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}

export type SubjectPostResponseDto = SubjectGetResponseDto;
