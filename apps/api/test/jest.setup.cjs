require('ts-node').register({ transpileOnly: true });
require('tsconfig-paths').register();

const { Test } = require('@nestjs/testing');

const { AppModule } = require('@/app.module');
const { DatabaseService } = require('@/database/database.service');
const { SwaggerService } = require('@/swagger/swagger.service');

module.exports = async function () {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  const db = moduleRef.get(DatabaseService).getDbHandle();
  const spec = moduleRef.get(SwaggerService).createDocument(app);
  const server = app.getHttpServer();

  global.TestSetup = { app, db, spec, server };
};
