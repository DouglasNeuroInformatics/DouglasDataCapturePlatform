import { Test } from '@nestjs/testing';

import { CreateInstrumentReqDto } from '../dto/create-instrument.dto';
import { InstrumentsController } from '../instruments.controller';
import { InstrumentsService } from '../instruments.service';
import { Instrument } from '../schemas/instrument.schema';

import { getInstrumentStub } from './stubs/instrument.stub';

jest.mock('../instruments.service');

describe('InstrumentsController', () => {
  let instrumentsController: InstrumentsController;
  let instrumentsService: InstrumentsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [InstrumentsController],
      providers: [InstrumentsService]
    }).compile();

    instrumentsController = moduleRef.get(InstrumentsController);
    instrumentsService = moduleRef.get(InstrumentsService);
  });

  describe('create', () => {
    describe('when create is called', () => {
      let instrument: Instrument;
      let createInstrumentReqDto: CreateInstrumentReqDto;

      beforeEach(async () => {
        const { title, description, instructions } = getInstrumentStub();
        createInstrumentReqDto = {
          title,
          description,
          instructions,
          fields: []
        };
        instrument = await instrumentsController.create(createInstrumentReqDto);
      });

      it('should call instrumentsService.create', () => {
        expect(instrumentsService.create).toBeCalledWith(createInstrumentReqDto);
      });

      it('should return the created instrument', () => {
        expect(instrument).toEqual(getInstrumentStub());
      });
    });
  });

  describe('getAll', () => {
    describe('when getAll is called', () => {
      let instruments: Instrument[];

      beforeEach(async () => {
        instruments = await instrumentsController.getAll();
      });

      it('should call instrumentsService.getAll', () => {
        expect(instrumentsService.getAll).toBeCalled();
      });

      it('should return an array of instruments', () => {
        expect(instruments).toEqual([getInstrumentStub()]);
      });
    });
  });
});
