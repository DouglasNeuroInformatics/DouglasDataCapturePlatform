import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Connection } from 'mongoose';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';

describe('Subjects', () => {
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

  afterAll(async () => {
    await dbConnection.collection('subjects').deleteMany({});
    await app.close();
  });

  describe('POST /subjects', () => undefined);

  describe('GET /subjects', () => {
    let response: any;

    beforeEach(async () => {
      response = await request(httpServer).get('/subjects');
    });

    it('should return status 200', () => {
      expect(response.status).toBe(HttpStatus.OK);
    });
  });

  describe('GET /subjects/:id', () => undefined);

  describe('PATCH /subjects/:id', () => undefined);

  describe('DELETE /subjects/:id', () => undefined);
});
