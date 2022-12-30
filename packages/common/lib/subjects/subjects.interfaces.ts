import { Sex } from './subjects.enums';

export interface SubjectInterface {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}
