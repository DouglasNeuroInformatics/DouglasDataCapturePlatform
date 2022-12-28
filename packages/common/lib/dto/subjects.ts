import { Sex } from '../enums';

export interface CreateSubjectRequestDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}
