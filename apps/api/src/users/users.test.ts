import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { Connection } from 'mongoose';
import request from 'supertest';

import { User } from './schemas/user.schema';

import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';

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

describe('Users', () => {
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
    await dbConnection.collection('users').deleteMany({});
    await app.close();
  });

  describe('POST /users', () => undefined);

  describe('GET /users', () => {
    let response: any;

    beforeEach(async () => {
      response = await request(httpServer).get('/users');
    });

    it('should return status 200', () => {
      expect(response.status).toBe(HttpStatus.OK);
    });

    it('should return an array equal to the length of mockUsers', () => {
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(mockUsers.length);
    });

    /*
    
    it('should not include passwords in the response', () => {
      response.body.forEach((user: any) => {
        expect(user).not.toHaveProperty('password');
      });
    });

    */
  
  });

  describe('GET /users/:username', () => undefined);

  describe('PATCH /users/:username', () => undefined);

  describe('DELETE /users/:username', () => undefined);

});
