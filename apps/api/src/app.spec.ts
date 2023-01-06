import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';

import { Connection } from 'mongoose';
import request from 'supertest';

import { AppModule } from '@/app.module';
import { DatabaseService } from '@/database/database.service';

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
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('auth', () => {
    describe('POST /auth/login', () => {
      it('should provide tokens for authorized users', async () => {
        const response = await request(server).post('/auth/login').send({
          username: 'admin',
          password: 'default'
        });
        expect(response.status).toBe(HttpStatus.OK);
      });
    });

    describe('POST /auth/logout', () => undefined);
    describe('POST /auth/refresh', () => undefined);
  });
});
