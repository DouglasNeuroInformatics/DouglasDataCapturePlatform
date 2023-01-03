import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { getInstrumentStub } from './stubs/instrument.stub';

import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('/instruments', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let httpServer: any;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  test('GET /instruments', async () => {
    await dbConnection.collection('instruments').insertOne(getInstrumentStub());
    const response = await request(httpServer).get('/instruments');
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toMatchObject([getInstrumentStub()]);
  });

  describe('POST /instrument', () => {
    it('should add an instrument to the database', async () => {
      const response = await request(httpServer).post('/instruments').send({
        title: 'Happiness Questionnaire',
        description: 'An instrument to measure happiness',
        instructions: 'Please complete the following question',
        fields: []
      });
      expect(response.status).toBe(HttpStatus.CREATED)
    });
  });


  afterEach(async () => {
    await dbConnection.collection('instruments').deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });
});
