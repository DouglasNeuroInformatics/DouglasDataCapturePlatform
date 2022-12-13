import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true
    })
  );
  app.setGlobalPrefix('/api');

  const documentConfig = new DocumentBuilder()
    .setTitle('Douglas Data Capture Platform API')
    .setDescription('This is the autogenerated API documentation for the Douglas Data Capture Platform.')
    .setVersion('1.0')
    .addTag('subjects')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document, {
    customJs: 'console.log("TEST")'
  });

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
