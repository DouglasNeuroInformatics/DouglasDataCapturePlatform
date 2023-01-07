import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';

import { Connection } from 'mongoose';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';
import { mockAdmin, mockAdminPlainTextPassword, mockUser } from '@/users/test/stubs/user.stubs';

describe('App (e2e) {Supertest}', () => {
  let app: NestExpressApplication;
  let db: Connection;
  let server: any;
  
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    db = moduleRef.get(DatabaseService).getDbHandle();
    await db.collection('users').insertMany(structuredClone([mockAdmin, mockUser]));
    server = app.getHttpServer();
  });

  afterAll(async () => {
    if (db.name !== 'testing') {
      throw new Error(`Unexpected database name ${db.name}`);
    }
    await db.dropDatabase();
    await app.close();
  });

  describe('auth', () => {
    sayHello();
    describe('POST /auth/login', () => {
      describe('admin requests authentication with valid credentials', () => {
        let response: any;
        beforeAll(async () => {
          response = await request(server).post('/auth/login').send({
            username: mockAdmin.username,
            password: mockAdminPlainTextPassword
          });
        });

        it('should return status code 200', () => {
          expect(response.status).toBe(HttpStatus.OK);
        });

        it('should provide an access and refresh token', () => {
          expect(response.body).toMatchObject(
            expect.objectContaining({
              accessToken: expect.any(String),
              refreshToken: expect.any(String)
            })
          );
        });
      });

      describe('admin requests authentication with extra whitespace in password', () => {
        let response: any;
        beforeAll(async () => {
          response = await request(server)
            .post('/auth/login')
            .send({
              username: mockAdmin.username,
              password: mockAdminPlainTextPassword + ' '
            });
        });

        it('should return status code 401', () => {
          expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
        });
      });

      describe
    });

    describe('POST /auth/logout', () => undefined);
    describe('POST /auth/refresh', () => undefined);
  });
});
