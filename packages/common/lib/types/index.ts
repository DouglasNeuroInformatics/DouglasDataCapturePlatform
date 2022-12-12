export type Sex = 'male' | 'female';

export interface SubjectType {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}
