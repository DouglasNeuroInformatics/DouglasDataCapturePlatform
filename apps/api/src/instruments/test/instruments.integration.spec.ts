import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Connection } from 'mongoose';
import request from 'supertest';

import { getInstrumentStub } from './stubs/instrument.stub';

import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';

describe('Instruments', () => {
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

  afterEach(async () => {
    await dbConnection.collection('instruments').deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /instrument', () => {
    let response: any;

    beforeEach(async () => {
      await dbConnection.collection('instruments').insertOne(getInstrumentStub());
      response = await request(httpServer).get('/instruments');
    });

    it('should return a response status code of 200', () => {
      expect(response.status).toBe(HttpStatus.OK);
    });

    it('should return all instruments in the database', async () => {
      expect(response.body).toMatchObject([getInstrumentStub()]);
    });
  });

  describe('POST /instrument', () => {
    it('should add an instrument to the database', async () => {
      const response = await request(httpServer).post('/instruments').send({
        title: 'Happiness Questionnaire',
        description: 'An instrument to measure happiness',
        instructions: 'Please complete the following question',
        fields: []
      });
      expect(response.status).toBe(HttpStatus.CREATED);
    });
  });
});
