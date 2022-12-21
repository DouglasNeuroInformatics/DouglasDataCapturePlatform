import { Sex } from '../enums/index';

export interface CreateSubjectRequestDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}
