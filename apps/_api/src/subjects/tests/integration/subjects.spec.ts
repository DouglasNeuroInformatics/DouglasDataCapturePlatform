import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Connection } from 'mongoose';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';
import { subjectStub } from '@/subjects/tests/stubs/subject.stub';

describe('/subject', () => {
  let app: INestApplication;
  let dbConnection: Connection;
  let httpServer: unknown;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('/api');
    await app.init();

    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle();
    httpServer = app.getHttpServer();
  });

  describe('GET /api/subjects', () => {
    it('should return status code 200', async () => {
      const response = await request(httpServer).get('/api/subjects');
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('should return a an array of subjects', async () => {
      await dbConnection.collection('subjects').insertOne(subjectStub());
      const response = await request(httpServer).get('/api/subjects');
      console.log(response.body);
      // expect(JSON.parse().toMatchObject([subjectStub()])
    });
  });

  describe('GET /api/subjects/{id}', () => {
    return;
  });

  describe('POST /api/subjects', () => {
    return;
  });

  describe('DELETE /api/subjects/{id}', () => {
    return;
  });

  afterEach(async () => {
    await dbConnection.collection('subjects').deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });
});
