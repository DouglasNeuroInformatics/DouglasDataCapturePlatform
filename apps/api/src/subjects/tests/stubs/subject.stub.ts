import { Sex } from '@dnp/common';

import { Subject } from '../../schemas/subject.schema';

// Cannot set ID to string without TypeScript complaining
type MockSubject = Omit<Subject, '_id'>;

export function subjectStub(): MockSubject {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: new Date(1980, 0),
    sex: Sex.Female
  };
}
