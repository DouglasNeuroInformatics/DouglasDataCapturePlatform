export type Sex = 'male' | 'female';

export interface SubjectType {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  sex: Sex;
}

export type UserRole = 'admin';

export interface UserType {
  username: string;
  password: string;
  role: UserRole
}