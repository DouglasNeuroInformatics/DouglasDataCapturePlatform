import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';

import { Model } from 'mongoose';

import { Subject } from './schemas/subject.schema';
import { SubjectsService } from './subjects.service';

const mockSubject: Subject = {
  _id: 'this-is-not-a-real-id',
  firstName: 'Jane',
  lastName: 'Doe',
  dateOfBirth: new Date(1980, 0),
  sex: 'female'
};

describe('SubjectsService', () => {
  let model: Model<Subject>;
  let service: SubjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SubjectsService,
        {
          provide: getModelToken('Subject'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockSubject),
            constructor: jest.fn().mockResolvedValue(mockSubject),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn()
          }
        }
      ]
    }).compile();
    service = module.get(SubjectsService);
    model = module.get<Model<Subject>>(getModelToken('Subject'));
  });

  it('should be defined', () => {
    expect(model).toBeDefined();
    expect(service).toBeDefined();
  });

  /*
  
  test('findAll', () => {
    const result = ['test'];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);
    expect(await catsController.findAll()).toBe(result);
  })

  it('should return all cats', async () => {
    const cats = await service.findAll();
    console.log(cats)
  });

  */
});
