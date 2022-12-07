import { Test } from '@nestjs/testing';

import { SubjectsService } from './subjects.service';

const mockSubject = {
  firstName: 'Jane',
  lastName: 'Doe'
};

describe('SubjectsService', () => {
  let subjectsService: SubjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SubjectsService]
    }).compile();
    subjectsService = module.get(SubjectsService);
  });

  test('findAll', () => {
    expect(subjectsService.findAll()).toEqual([]);
  });
});
