import { Test, TestingModule } from '@nestjs/testing';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './schemas/subject.schema';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

describe('SubjectsController', () => {
  let subjectsController: SubjectsController;
  let subjectsService: SubjectsService;

  const createSubjectDto: CreateSubjectDto = {
    firstName: 'Jane',
    lastName: 'Doe',
    dateOfBirth: new Date(1980, 0),
    sex: 'female'
  };

  const mockSubject: Subject = {
    _id: 'does-not-matter',
    ...createSubjectDto
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [
        {
          provide: SubjectsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockSubject])
            // create: jest.fn().mockResolvedValue(CreateSubjectDto)
          }
        }
      ]
    }).compile();

    subjectsController = module.get<SubjectsController>(SubjectsController);
    subjectsService = module.get<SubjectsService>(SubjectsService);
  });

  describe('findAll()', () => {
    it('should return an array of subjects', async () => {
      await expect(subjectsController.findAll()).resolves.toEqual([mockSubject]);
    });
  });
});
