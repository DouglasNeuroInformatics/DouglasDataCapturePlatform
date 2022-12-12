import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('GET /subjects', async () => {
    await request(app.getHttpServer()).get('/subjects').expect(HttpStatus.OK);
  });

  test('GET /subjects/1', async () => {
    await request(app.getHttpServer()).get('/subjects/1').expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
