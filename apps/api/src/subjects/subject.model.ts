import { Diagnosis } from './dto/create-subject.dto';

export interface Subject {
  _id: string;
  firstName: string;
  lastName: string;
  dx?: Diagnosis;
}
