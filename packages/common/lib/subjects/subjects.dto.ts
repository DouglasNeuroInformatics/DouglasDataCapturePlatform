import { Sex } from './subjects.enums';

export interface SubjectDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}
