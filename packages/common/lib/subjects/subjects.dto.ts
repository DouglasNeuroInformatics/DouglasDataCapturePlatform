import { Sex } from './subjects.enums';

export interface CreateSubjectRequestDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}
