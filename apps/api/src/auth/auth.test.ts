import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Connection } from 'mongoose';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';
import { User } from '@/users/schemas/user.schema';

const mockUsers: User[] = [
  {
    username: 'test_admin',
    password: 'default',
    role: 'admin'
  },
  {
    username: 'test_user',
    password: 'default',
    role: 'user'
  }
];

describe('Auth', () => {
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
    await dbConnection.collection('users').insertMany(mockUsers);
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    dbConnection
      .collection('users')
      .find()
      .toArray(function (err, docs) {
        console.log(JSON.stringify(docs));
      });

    await dbConnection.collection('users').deleteMany({});
    await app.close();
  });

  describe('POST /auth/login', () => {
    let response: any;

    beforeEach(async () => {
      response = await request(httpServer).post('/auth/login').send({
        username: 'test_admin',
        password: 'default'
      });
    });

    it('should return status 200', () => {
      expect(response.status).toBe(200);
    });
  });

  describe('POST /auth/logout', () => undefined);

  describe('POST /auth/refresh', () => undefined);
});
