import { getInstrumentStub } from '../test/stubs/instrument.stub';

export const InstrumentsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(getInstrumentStub()),
  getAll: jest.fn().mockResolvedValue([getInstrumentStub()])
});
